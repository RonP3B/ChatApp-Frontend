import { useChatContext } from "@/shared/contexts";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { ChatMain } from "./ChatMain/chat-main.component";
import { NoChats } from "..";
import { ChatFooter } from "./ChatFooter/chat-footer.component";
import { ChatHeader } from "./ChatHeader/chat-header.component";
import { Fragment } from "react";

export const ChatContainer: React.FC = () => {
  const { chatContextValues } = useChatContext();

  if (!chatContextValues.selectedChat) {
    return (
      <NoChats
        msg="Select a chat"
        chatSection={true}
        Icon={ChatBubbleOutlineIcon}
        handleButton={undefined}
      />
    );
  }

  return (
    <Fragment>
      <ChatHeader />
      <ChatMain />
      <ChatFooter />
    </Fragment>
  );
};
