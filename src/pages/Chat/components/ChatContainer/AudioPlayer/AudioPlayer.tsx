import { Box, IconButton, Slider, Typography } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import { AudioPlayerProps } from "./AudioPlayerProps";
import { useAudioPlayer } from "./useAudioPlayer";
import { getAudioPlayerStyles } from "./audioPlayerStyles";

export const AudioPlayer = ({ src, color }: AudioPlayerProps) => {
  const { audioPlayerValues, audioPlayerActions } = useAudioPlayer();
  const styles = getAudioPlayerStyles(color);

  return (
    <Box component="span" sx={styles.container}>
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
        sx={styles.playButton}
      >
        {audioPlayerValues.isPlaying ? (
          <PauseRoundedIcon sx={styles.icon} />
        ) : (
          <PlayArrowRoundedIcon sx={styles.icon} />
        )}
      </IconButton>
      <Slider
        size="small"
        value={audioPlayerValues.currentTime}
        max={audioPlayerValues.duration || 1}
        onChange={audioPlayerActions.handleSeek}
        onChangeCommitted={audioPlayerActions.handleSeekCommitted}
        sx={styles.slider}
      />
      <Typography variant="caption" sx={styles.time}>
        {audioPlayerValues.displayTime}
      </Typography>
    </Box>
  );
};
