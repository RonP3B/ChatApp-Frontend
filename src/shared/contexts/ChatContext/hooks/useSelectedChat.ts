import { Room } from "@/shared/types";
import { useContext } from "react";
import { SelectedChatContext } from "../ChatContext";

export const useSelectedChat = (): Room | null => {
  const selectedChat = useContext(SelectedChatContext);

  if (selectedChat === undefined) {
    throw new Error(
      "useSelectedChat must be used within a ChatContextProvider"
    );
  }

  return selectedChat;
};
