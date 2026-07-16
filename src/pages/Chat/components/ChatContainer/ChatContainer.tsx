import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useSelectedChat } from "@/shared/contexts/ChatContext";
import { ChatMain } from "./ChatMain/ChatMain";
import { NoChats } from "..";
import { ChatFooter } from "./ChatFooter/ChatFooter";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { Fragment } from "react";

export const ChatContainer: React.FC = () => {
  const selectedChat = useSelectedChat();

  if (!selectedChat) {
    return (
      <NoChats
        msg="Select a chat"
        chatSection={true}
        Icon={ChatBubbleOutlineOutlinedIcon}
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
