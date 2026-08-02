import { registerPlayback, formatAudioDuration } from "@/pages/Chat/utils";
import { useRef, useState } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const togglePlay = (): void => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) audio.pause();
    else audio.play();
  };

  const handlePlay = (): void => {
    if (audioRef.current) registerPlayback(audioRef.current);
    setIsPlaying(true);
  };

  const handlePause = (): void => setIsPlaying(false);

  const handleLoadedMetadata = (): void => {
    const audio = audioRef.current;

    if (!audio) return;

    const isMissingDuration =
      !Number.isFinite(audio.duration) || audio.duration === 0;

    if (isMissingDuration) {
      const handleDurationChange = (): void => {
        if (!Number.isFinite(audio.duration) || audio.duration === 0) return;
        audio.removeEventListener("durationchange", handleDurationChange);
        audio.currentTime = 0;
        setDuration(audio.duration);
      };
      audio.addEventListener("durationchange", handleDurationChange);
      audio.currentTime = 1e101;
    } else {
      setDuration(audio.duration);
    }
  };

  const handleTimeUpdate = (): void => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = (): void => setCurrentTime(0);

  const handleSeek = (_event: Event, value: number | number[]): void => {
    setCurrentTime(Array.isArray(value) ? value[0] : value);
  };

  const handleSeekCommitted = (
    _event: Event | React.SyntheticEvent,
    value: number | number[]
  ): void => {
    const newTime = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) audioRef.current.currentTime = newTime;
  };

  const displayTime = formatAudioDuration(
    currentTime > 0 ? currentTime : duration
  );

  return {
    audioPlayerValues: { isPlaying, currentTime, duration, displayTime },
    audioPlayerActions: {
      audioRef,
      togglePlay,
      handlePlay,
      handlePause,
      handleLoadedMetadata,
      handleTimeUpdate,
      handleEnded,
      handleSeek,
      handleSeekCommitted,
    },
  };
};
