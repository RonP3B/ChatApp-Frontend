import { useEffect, useRef, useState } from "react";
import { useToast } from "@/shared/hooks";
import { useSendFileMessage } from "@/pages/Chat/hooks";
import { RecordingStatus } from "./RecordingStatus";
import { createFlatLevels, getSupportedMimeType } from "./utils";
import { WAVEFORM_CONFIG } from "./constants";

export const useVoiceRecorder = (selectedChatId?: string) => {
  const toast = useToast();
  const { sendFileMessage } = useSendFileMessage();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const mimeTypeRef = useRef<string>("audio/webm");
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sampleDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const sampleIntervalRef = useRef<ReturnType<typeof setInterval>>();
  const previousChatIdRef = useRef(selectedChatId);

  const [status, setStatus] = useState<RecordingStatus>("idle");
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [waveformLevels, setWaveformLevels] =
    useState<number[]>(createFlatLevels());

  const startTimer = (): void => {
    intervalRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = (): void => clearInterval(intervalRef.current);

  const startLevelSampling = (stream: MediaStream): void => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();

    analyser.fftSize = 256;
    source.connect(analyser);
    audioContext.resume();

    audioContextRef.current = audioContext;
    analyserRef.current = analyser;
    sampleDataRef.current = new Uint8Array(analyser.frequencyBinCount);

    sampleIntervalRef.current = setInterval(() => {
      const analyserNode = analyserRef.current;
      const dataArray = sampleDataRef.current;

      if (!analyserNode || !dataArray) return;

      analyserNode.getByteTimeDomainData(dataArray);

      let sumSquares = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const normalized = (dataArray[i] - 128) / 128;
        sumSquares += normalized * normalized;
      }

      const rms = Math.sqrt(sumSquares / dataArray.length);
      const level = Math.min(
        100,
        Math.max(
          WAVEFORM_CONFIG.minLevel,
          rms * 100 * WAVEFORM_CONFIG.levelGain
        )
      );

      setWaveformLevels((prev) => [...prev.slice(1), level]);
    }, WAVEFORM_CONFIG.sampleIntervalMs);
  };

  const stopLevelSampling = (): void => {
    clearInterval(sampleIntervalRef.current);
    audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    sampleDataRef.current = null;
  };

  const releaseStream = (): void => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const resetRecorder = (): void => {
    stopTimer();
    stopLevelSampling();
    releaseStream();

    chunksRef.current = [];
    mediaRecorderRef.current = null;

    setElapsedSeconds(0);
    setWaveformLevels(createFlatLevels());
    setStatus("idle");
  };

  const startRecording = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mimeType = getSupportedMimeType();

      streamRef.current = stream;
      mimeTypeRef.current = mimeType ?? "audio/webm";
      chunksRef.current = [];

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      recorder.ondataavailable = (event: BlobEvent): void => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();

      setElapsedSeconds(0);
      setStatus("recording");
      startTimer();
      startLevelSampling(stream);
    } catch (error) {
      toast("Microphone access is required to record a voice message.", {
        type: "error",
      });
    }
  };

  const cancelRecording = (): void => {
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== "inactive") recorder.stop();
    resetRecorder();
  };

  const finalizeRecording = (): Promise<Blob> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;

      if (!recorder || recorder.state === "inactive") {
        resolve(new Blob(chunksRef.current, { type: mimeTypeRef.current }));
        return;
      }

      recorder.onstop = () => {
        resolve(new Blob(chunksRef.current, { type: mimeTypeRef.current }));
      };

      recorder.stop();
    });
  };

  const sendRecording = async (): Promise<void> => {
    stopTimer();
    stopLevelSampling();

    const blob = await finalizeRecording();
    const extension = mimeTypeRef.current.includes("mp4") ? "mp4" : "webm";
    const file = new File([blob], `voice-message.${extension}`, {
      type: mimeTypeRef.current,
    });

    resetRecorder();
    await sendFileMessage(file, "audio");
  };

  useEffect(() => {
    if (previousChatIdRef.current === selectedChatId) return;
    previousChatIdRef.current = selectedChatId;
    cancelRecording();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChatId]);

  useEffect(() => {
    return () => {
      releaseStream();
      stopLevelSampling();
    };
  }, []);

  return {
    voiceRecorderValues: { status, elapsedSeconds, waveformLevels },
    voiceRecorderActions: { startRecording, cancelRecording, sendRecording },
  };
};
