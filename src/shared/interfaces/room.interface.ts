import { Message } from "./message.interface";
import { User } from "./user.interface";

export interface Room {
  id: string;
  name: string;
  image: string;
  isGroup: boolean;
  lastMessage: string | null;
  lastMessageDate: Date | null;
  admins: User[];
  participants: User[];
  messages: Message[];
  unreadMessages: number;
}
