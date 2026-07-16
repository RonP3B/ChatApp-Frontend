import { SendMessageValues } from "@/pages/Chat/types";
import { Room } from "@/shared/types";

export const addSenderNameToGroupMessage = (
  messageToSend: SendMessageValues,
  selectedChat: Room | null,
  senderName: string
): void => {
  if (selectedChat?.isGroup) {
    messageToSend["senderName"] = senderName;
  }
};
