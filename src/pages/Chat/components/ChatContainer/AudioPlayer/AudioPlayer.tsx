import { Box, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { AudioPlayerProps } from "./AudioPlayerProps";
import { useAudioPlayer } from "./useAudioPlayer";
import { getAudioPlayerStyles } from "./audioPlayerStyles";

export const AudioPlayer = ({ src, color }: AudioPlayerProps) => {
  const { audioPlayerValues, audioPlayerActions } = useAudioPlayer();
  const audioPlayerStyles = getAudioPlayerStyles(color);

  return (
    <Box component="span" sx={audioPlayerStyles.container}>
      <audio
        ref={audioPlayerActions.audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={audioPlayerActions.handleLoadedMetadata}
        onTimeUpdate={audioPlayerActions.handleTimeUpdate}
        onPlay={audioPlayerActions.handlePlay}
        onPause={audioPlayerActions.handlePause}
        onEnded={audioPlayerActions.handleEnded}
        style={{ display: "none" }}
      />
      <IconButton
        onClick={audioPlayerActions.togglePlay}
        size="small"
        sx={audioPlayerStyles.playButton}
      >
        {audioPlayerValues.isPlaying ? (
          <PauseRoundedIcon sx={audioPlayerStyles.icon} />
        ) : (
          <PlayArrowRoundedIcon sx={audioPlayerStyles.icon} />
        )}
      </IconButton>
      <Slider
        size="small"
        value={audioPlayerValues.currentTime}
        max={audioPlayerValues.duration || 1}
        onChange={audioPlayerActions.handleSeek}
        onChangeCommitted={audioPlayerActions.handleSeekCommitted}
        sx={audioPlayerStyles.slider}
      />
      <Typography variant="caption" sx={audioPlayerStyles.time}>
        {audioPlayerValues.displayTime}
      </Typography>
    </Box>
  );
};
