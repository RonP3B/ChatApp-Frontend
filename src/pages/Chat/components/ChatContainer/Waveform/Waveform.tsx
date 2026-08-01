import { Box } from "@mui/material";
import { WaveformProps } from "./WaveformProps";
import { getWaveformStyles } from "./waveformStyles";

export const Waveform = ({ levels, color }: WaveformProps) => {
  const styles = getWaveformStyles(color);

  return (
    <Box sx={styles.container}>
      {levels.map((level, i) => (
        <Box key={i} sx={{ ...styles.bar, height: `${level}%` }} />
      ))}
    </Box>
  );
};
