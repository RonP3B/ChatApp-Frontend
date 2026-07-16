import { useContext } from "react";
import { ChatDraftContext } from "../ChatContext";

export const useChatDraft = (): string => {
  const textMsgToSend = useContext(ChatDraftContext);

  if (textMsgToSend === null) {
    throw new Error("useChatDraft must be used within a ChatContextProvider");
  }

  return textMsgToSend;
};
