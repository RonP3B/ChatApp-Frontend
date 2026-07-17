import { Box, Avatar, Paper, Typography } from "@mui/material";
import { MessageProps } from "./MessageProps";
import { MessageType } from "@/shared/enums";
import { formatDate } from "@/shared/utils";
import { useMessage } from "./useMessage";
import { messageStyles } from "./messageStyles";

export const Message = ({
  user,
  time,
  content,
  messageType,
  error,
}: MessageProps) => {
  const { messageValues, messageActions } = useMessage(user, error);

  return (
    <Box sx={messageValues.dynamicMessageStyles.mainContainer}>
      <Box sx={messageValues.dynamicMessageStyles.avatarTriangle}>
        <Avatar
          alt={user.username}
          src={user.avatar}
          sx={messageValues.dynamicMessageStyles.avatar}
        />
      </Box>
      <Paper sx={messageValues.dynamicMessageStyles.messagePaper}>
        <Typography
          variant="subtitle2"
          sx={messageValues.dynamicMessageStyles.textColor}
        >
          {user.username}
        </Typography>
        <Typography
          variant="body1"
          sx={messageValues.dynamicMessageStyles.textColor}
        >
          {messageType === MessageType.IMAGE && (
            <Box component="span" sx={messageValues.mediaPlaceholderStyles}>
              <Box
                component="img"
                src={content}
                alt="Message Image"
                onLoad={messageActions.handleMediaLoad}
                sx={messageStyles.messageMedia}
              />
            </Box>
          )}
          {messageType === MessageType.VIDEO && (
            <Box component="span" sx={messageValues.mediaPlaceholderStyles}>
              <Box
                component="video"
                controls
                src={content}
                onLoadedData={messageActions.handleMediaLoad}
                sx={messageStyles.messageMedia}
              />
            </Box>
          )}
          {messageType === MessageType.AUDIO && (
            <Box
              component="audio"
              controls
              src={content}
              sx={messageStyles.messageAudio}
            />
          )}
          {messageType === MessageType.TEXT && content}
        </Typography>
        {!error ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={messageValues.dynamicMessageStyles.time}
          >
            {formatDate(new Date(time))}
          </Typography>
        ) : (
          <Typography variant="caption" sx={messageStyles.errorText}>
            This message couldn't be sent &#9785;
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
