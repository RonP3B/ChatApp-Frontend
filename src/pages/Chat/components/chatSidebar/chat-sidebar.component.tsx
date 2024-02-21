import { Box } from "@mui/material";
import { useChatSidebarHeader } from "./ChatSidebarHeader/chat-sidebar-header.hook";
import { useChatSidebarList } from "./ChatSidebarList/chat-sidebar-list.hook";
import { ChatSidebarHeader } from "./ChatSidebarHeader/chat-sidebar-header.component";
import { ChatSidebarList } from "./ChatSidebarList/chat-sidebar-list.component";

export const ChatSidebar: React.FC = () => {
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
