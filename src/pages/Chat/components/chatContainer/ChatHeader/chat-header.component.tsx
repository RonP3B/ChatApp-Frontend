import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ChatHeaderStyles } from "./chat-header.styles";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import { useChatHeader } from "./chat-header.hook";
import { Box, Toolbar, IconButton, Avatar, Typography } from "@mui/material";

export const ChatHeader: React.FC = () => {
  const selectedChat = useSelectedChat();
  const { chatHeaderValues } = useChatHeader(selectedChat);
  const chatActions = useChatActions();

  if (!selectedChat) return null;

  return (
    <Box sx={ChatHeaderStyles.container}>
      <Toolbar>
        {chatHeaderValues.isScreenBelow900px && (
          <IconButton onClick={chatActions.handleArrowBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Avatar
          alt={selectedChat.name}
          src={selectedChat.image}
          sx={ChatHeaderStyles.avatar}
        />
        <Box sx={ChatHeaderStyles.userInfoContainer}>
          <Typography variant="h6" sx={ChatHeaderStyles.lineHeight}>
            {selectedChat.name}
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
