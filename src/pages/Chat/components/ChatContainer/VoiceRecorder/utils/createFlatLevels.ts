import { WAVEFORM_CONFIG } from "../constants";

export const createFlatLevels = (): number[] =>
  new Array(WAVEFORM_CONFIG.visibleBarCount).fill(WAVEFORM_CONFIG.minLevel);
