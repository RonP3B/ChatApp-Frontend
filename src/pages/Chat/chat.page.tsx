import { useChatContext } from "@/shared/contexts";
import { Grid, Paper, useMediaQuery } from "@mui/material";
import { useChatStyles } from "./chat.styles";
import { ChatContainer, ChatEventsHandler, ChatSidebar } from "./components";

export const Chat: React.FC = () => {
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");
  const { chatContextValues } = useChatContext();
  const chatStyles = useChatStyles();

  return (
    <ChatEventsHandler>
      <Grid container component={Paper} sx={chatStyles.mainContainer}>
        <Grid
          item
          xs={!isScreenBelow900px ? 4 : chatContextValues.selectedChat ? 0 : 12}
          sx={chatStyles.sidebarGrid}
        >
          <ChatSidebar />
        </Grid>
        <Grid
          item
          xs={!isScreenBelow900px ? 8 : chatContextValues.selectedChat ? 12 : 0}
          sx={chatStyles.chatContainerGrid}
        >
          <ChatContainer />
        </Grid>
      </Grid>
    </ChatEventsHandler>
  );
};
