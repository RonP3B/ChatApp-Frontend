import { Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatAudioDuration } from "@/pages/Chat/utils";
import { VoiceRecorderProps } from "./VoiceRecorderProps";
import { voiceRecorderStyles } from "./voiceRecorderStyles";
import { Waveform } from "../Waveform/Waveform";

export const VoiceRecorder = ({
  elapsedSeconds,
  waveformLevels,
  onCancel,
}: VoiceRecorderProps) => {
  return (
    <Box sx={voiceRecorderStyles.container}>
      <IconButton
        onClick={onCancel}
        size="small"
        sx={voiceRecorderStyles.deleteButton}
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
      <Box sx={voiceRecorderStyles.recordingIndicator}>
        <Box sx={voiceRecorderStyles.recordingDot} />
        <Typography variant="caption" sx={voiceRecorderStyles.time}>
          {formatAudioDuration(elapsedSeconds)}
        </Typography>
        <Waveform levels={waveformLevels} color="primary.main" />
      </Box>
    </Box>
  );
};
