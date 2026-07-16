import { MessageType } from "@/shared/enums";
import { Message, User } from "@/shared/types";
import { fileToUrl } from "@/shared/utils";
import { SendMessageValues } from "../types";

export const createMessageToSend = (
  senderId: string,
  roomId: string,
  messageType: MessageType,
  content: string | File
): SendMessageValues => {
  const messageToSend: SendMessageValues = {
    senderId,
    roomId,
    messageType,
  };

  if (typeof content === "string") {
    messageToSend["content"] = content;
  } else {
    messageToSend["attachment"] = content;
  }

  return messageToSend;
};

export const createMessageToDisplay = async (
  messageToSend: SendMessageValues,
  messageToDisplayId: string,
  sender: User,
  file?: File
): Promise<Message> => {
  const messageToDisplay: Message = {
    id: messageToDisplayId,
    date: new Date(),
    sender,
    senderId: messageToSend.senderId,
    roomId: messageToSend.roomId,
    messageType: messageToSend.messageType,
    content: messageToSend.content ?? "",
    error: false,
  };

  if (file) {
    messageToDisplay["content"] = await fileToUrl(file);
  }

  return messageToDisplay;
};
