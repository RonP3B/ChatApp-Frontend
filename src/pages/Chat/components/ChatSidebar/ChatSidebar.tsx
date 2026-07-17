import { Box } from "@mui/material";
import { useChatSidebarHeader } from "./ChatSidebarHeader/useChatSidebarHeader";
import { useChatSidebarList } from "./ChatSidebarList/useChatSidebarList";
import { ChatSidebarHeader } from "./ChatSidebarHeader/ChatSidebarHeader";
import { ChatSidebarList } from "./ChatSidebarList/ChatSidebarList";

export const ChatSidebar = () => {
  const { chatSidebarHeaderValues, chatSidebarHeaderActions } =
    useChatSidebarHeader();

  const { chatSidebarListValues, chatSidebarListActions } = useChatSidebarList(
    chatSidebarHeaderValues.filterChat
  );

  return (
    <Box>
      <ChatSidebarHeader
        chatSidebarHeaderActions={chatSidebarHeaderActions}
        chatSidebarHeaderValues={chatSidebarHeaderValues}
      />
      <ChatSidebarList
        chatSidebarListValues={chatSidebarListValues}
        chatSidebarListActions={chatSidebarListActions}
      />
    </Box>
  );
};
