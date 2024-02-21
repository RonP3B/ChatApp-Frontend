import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChatHeaderStyles } from "./chat-header.styles";
import { useChatContext } from "@/shared/contexts";
import { useChatHeader } from "./chat-header.hook";
import { Box, Toolbar, IconButton, Avatar, Typography } from "@mui/material";

export const ChatHeader: React.FC = () => {
  const { chatHeaderValues } = useChatHeader();
  const { chatContextValues, chatContextActions } = useChatContext();

  return (
    <Box sx={ChatHeaderStyles.container}>
      <Toolbar>
        {chatHeaderValues.isScreenBelow900px && (
          <IconButton onClick={chatContextActions.handleArrowBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Avatar
          alt={chatContextValues.selectedChat!.name}
          src={chatContextValues.selectedChat!.image}
          sx={ChatHeaderStyles.avatar}
        />
        <Box sx={ChatHeaderStyles.userInfoContainer}>
          <Typography variant="h6" sx={ChatHeaderStyles.lineHeight}>
            {chatContextValues.selectedChat!.name}
          </Typography>
          <Typography
            variant="caption"
            color={chatHeaderValues.onlineStatusColor}
          >
            {chatHeaderValues.onlineStatus}
          </Typography>
        </Box>
      </Toolbar>
    </Box>
  );
};
