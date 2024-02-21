import { MessageType } from "@/shared/enums";

export interface SendMessageValues {
  messageType: MessageType;
  senderId: string;
  roomId: string;
  attachment?: Blob;
  content?: string;
  senderName?: string;
}
