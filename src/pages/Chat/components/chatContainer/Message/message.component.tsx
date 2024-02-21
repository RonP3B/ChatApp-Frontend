import { Box, Avatar, Paper, Typography } from "@mui/material";
import { MessageProps } from "./message.interface";
import { MessageType } from "@/shared/enums";
import { formatDate } from "@/shared/utils";
import { useMessage } from "./message.hook";

export const Message: React.FC<MessageProps> = ({
  user,
  time,
  content,
  messageType,
  error,
}) => {
  const { messageValues, messageActions } = useMessage(user, error);

  return (
    <Box sx={messageValues.MessageStyles.mainContainer}>
      <Box sx={messageValues.MessageStyles.avatarTriangle}>
        <Avatar
          alt={user.username}
          src={user.avatar}
          sx={messageValues.MessageStyles.avatar}
        />
      </Box>
      <Paper sx={messageValues.MessageStyles.messagePaper}>
        <Typography
          variant="subtitle2"
          sx={messageValues.MessageStyles.textColor}
        >
          {user.username}
        </Typography>
        <Typography variant="body1" sx={messageValues.MessageStyles.textColor}>
          {messageType === MessageType.IMAGE && (
            <Box
              component="span"
              display="block"
              height={messageValues.mediaHeight}
            >
              <Box
                component="img"
                src={content}
                alt="Message Image"
                onLoad={messageActions.handleMediaLoad}
                sx={messageValues.MessageStyles.messageMedia}
              />
            </Box>
          )}
          {messageType === MessageType.VIDEO && (
            <Box
              component="span"
              display="block"
              height={messageValues.mediaHeight}
            >
              <Box
                component="video"
                controls
                src={content}
                onLoadedData={messageActions.handleMediaLoad}
                sx={messageValues.MessageStyles.messageMedia}
              />
            </Box>
          )}
          {messageType === MessageType.AUDIO && (
            <Box
              component="audio"
              controls
              src={content}
              sx={messageValues.MessageStyles.messageAudio}
            />
          )}
          {messageType === MessageType.TEXT && content}
        </Typography>
        {!error ? (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={messageValues.MessageStyles.time}
          >
            {formatDate(new Date(time))}
          </Typography>
        ) : (
          <Typography variant="caption" style={{ color: "darkred" }}>
            This message couldn't be sent &#9785;
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
