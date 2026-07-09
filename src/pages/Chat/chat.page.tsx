import { Grid, Paper, useMediaQuery } from "@mui/material";
import { useChatStyles } from "./chat.styles";
import { ChatContainer, ChatEventsHandler, ChatSidebar } from "./components";
import { useSelectedChat } from "@/shared/contexts/ChatContext";

export const Chat: React.FC = () => {
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");
  const selectedChat = useSelectedChat();
  const chatStyles = useChatStyles(Boolean(selectedChat));

  return (
    <ChatEventsHandler>
      <Grid container component={Paper} sx={chatStyles.mainContainer}>
        <Grid
          size={!isScreenBelow900px ? 4 : selectedChat ? 0 : 12}
          sx={chatStyles.sidebarGrid}
        >
          <ChatSidebar />
        </Grid>
        <Grid
          size={!isScreenBelow900px ? 8 : selectedChat ? 12 : 0}
          sx={chatStyles.chatContainerGrid}
        >
          <ChatContainer />
        </Grid>
      </Grid>
    </ChatEventsHandler>
  );
};
