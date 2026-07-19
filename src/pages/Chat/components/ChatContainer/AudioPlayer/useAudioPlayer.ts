import { formatAudioDuration, registerPlayback } from "@/pages/Chat/utils";
import { useRef, useState } from "react";

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const isSeekingRef = useRef<boolean>(false);
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

  const handlePause = (): void => {
    setIsPlaying(false);
  };

  const handleLoadedMetadata = (): void => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleTimeUpdate = (): void => {
    if (isSeekingRef.current || !audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleEnded = (): void => {
    setCurrentTime(0);
    // No need to setIsPlaying(false) here — the browser always fires
    // pause right before ended, so handlePause already covers it.
  };

  const handleSeek = (_event: Event, value: number | number[]): void => {
    isSeekingRef.current = true;
    setCurrentTime(Array.isArray(value) ? value[0] : value);
  };

  const handleSeekCommitted = (
    _event: Event | React.SyntheticEvent,
    value: number | number[]
  ): void => {
    const newTime = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) audioRef.current.currentTime = newTime;
    isSeekingRef.current = false;
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
