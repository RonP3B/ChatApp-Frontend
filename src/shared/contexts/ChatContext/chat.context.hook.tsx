import { useContext } from "react";
import { ChatContextProps } from "./chat.context.interface";
import { ChatContext } from "./chat.context";

export const useChatContext = (): ChatContextProps => {
  const chatContext = useContext(ChatContext);

  if (!chatContext) {
    throw new Error(
      "useChatContext must be used within an ChatContextProvider"
    );
  }

  return chatContext;
};
