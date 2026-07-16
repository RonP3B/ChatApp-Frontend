import { Message, Room } from "@/shared/types";
import { AxiosResponse } from "axios";
import { SendMessageValues } from "../types";
import { sendMessage } from "../services";
import { updateRoomMessages } from "./updateRoomMessages";

export const handleMessageSending = async (
  messageToSend: SendMessageValues,
  senderName: string,
  lastMessage: string,
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
): Promise<void> => {
  const res: AxiosResponse = await sendMessage(messageToSend);
  const newMessage: Message = res.data;
  setRooms((prev) =>
    updateRoomMessages(prev, newMessage, lastMessage, senderName)
  );
};

export const handleMessageSendingFailure = (
  messageToDisplayId: string,
  setSelectedChat: React.Dispatch<React.SetStateAction<Room | null>>
): void => {
  setSelectedChat((prev) => markMessageWithError(prev, messageToDisplayId));
};

const markMessageWithError = (
  prev: Room | null,
  messageToDisplayId: string
): Room | null => {
  if (!prev) return prev;
  return {
    ...prev,
    messages: prev.messages.map((message) => {
      if (message.id !== messageToDisplayId) return message;
      return { ...message, error: true };
    }),
  };
};
