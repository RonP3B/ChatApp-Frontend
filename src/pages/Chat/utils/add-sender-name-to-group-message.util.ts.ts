import { SendMessageValues } from "@/pages/Chat/interfaces";
import { Room } from "@/shared/interfaces";

export const addSenderNameToGroupMessage = (
  messageToSend: SendMessageValues,
  selectedChat: Room | null,
  senderName: string
): void => {
  if (selectedChat?.isGroup) {
    messageToSend["senderName"] = senderName;
  }
};
