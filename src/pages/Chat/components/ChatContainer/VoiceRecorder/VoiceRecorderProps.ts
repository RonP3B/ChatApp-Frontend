export interface VoiceRecorderProps {
  elapsedSeconds: number;
  waveformLevels: number[];
  onCancel: () => void;
}
