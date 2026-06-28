import { useContext } from "react";
import { ChatContextActions } from "./chat-context.interface";
import { Room } from "@/shared/interfaces";
import {
  ChatActionsContext,
  ChatDraftContext,
  ChatRoomsContext,
  SelectedChatContext,
} from "./chat-context";

export const useChatActions = (): ChatContextActions => {
  const chatActions = useContext(ChatActionsContext);

  if (!chatActions) {
    throw new Error("useChatActions must be used within a ChatContextProvider");
  }

  return chatActions;
};

export const useChatDraft = (): string => {
  const textMsgToSend = useContext(ChatDraftContext);

  if (textMsgToSend === null) {
    throw new Error("useChatDraft must be used within a ChatContextProvider");
  }

  return textMsgToSend;
};

export const useChatRooms = (): Room[] => {
  const rooms = useContext(ChatRoomsContext);

  if (!rooms) {
    throw new Error("useChatRooms must be used within a ChatContextProvider");
  }

  return rooms;
};

export const useSelectedChat = (): Room | null => {
  const selectedChat = useContext(SelectedChatContext);

  if (selectedChat === undefined) {
    throw new Error(
      "useSelectedChat must be used within a ChatContextProvider"
    );
  }

  return selectedChat;
};
