import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { chatHeaderStyles } from "./chatHeaderStyles";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import { useChatHeader } from "./useChatHeader";
import { Box, Toolbar, IconButton, Avatar, Typography } from "@mui/material";

export const ChatHeader = () => {
  const selectedChat = useSelectedChat();
  const { chatHeaderValues } = useChatHeader(selectedChat);
  const chatActions = useChatActions();

  if (!selectedChat) return null;

  return (
    <Box sx={chatHeaderStyles.container}>
      <Toolbar>
        {chatHeaderValues.isScreenBelow900px && (
          <IconButton onClick={chatActions.handleArrowBack}>
            <ArrowBackIcon />
          </IconButton>
        )}
        <Avatar
          key={selectedChat.id}
          alt={selectedChat.name}
          src={selectedChat.image}
          sx={chatHeaderStyles.avatar}
        />
        <Box sx={chatHeaderStyles.userInfoContainer}>
          <Typography variant="h6" sx={chatHeaderStyles.lineHeight}>
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
