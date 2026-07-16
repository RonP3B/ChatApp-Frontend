import { MessageType } from "../enums";
import { User } from "./User";

export interface Message {
  id: string;
  content: string;
  date: Date;
  messageType: MessageType;
  sender: User;
  senderId: string;
  roomId: string;
  error?: boolean;
}
