import { Box } from "@mui/material";
import { WaveformProps } from "./WaveformProps";
import { getWaveformStyles } from "./waveformStyles";
import { useWaveform } from "./useWaveform";

export const Waveform = ({ levels, color }: WaveformProps) => {
  const { containerRef, visibleLevels } = useWaveform(levels);
  const styles = getWaveformStyles(color);

  return (
    <Box ref={containerRef} sx={styles.container}>
      {visibleLevels.map((level, i) => (
        <Box key={i} sx={{ ...styles.bar, height: `${level}%` }} />
      ))}
    </Box>
  );
};
