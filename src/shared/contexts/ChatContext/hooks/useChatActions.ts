import { useContext } from "react";
import { ChatActionsContext } from "../ChatContext";
import { ChatContextActions } from "../ChatContextActions";

export const useChatActions = (): ChatContextActions => {
  const chatActions = useContext(ChatActionsContext);

  if (!chatActions) {
    throw new Error("useChatActions must be used within a ChatContextProvider");
  }

  return chatActions;
};
