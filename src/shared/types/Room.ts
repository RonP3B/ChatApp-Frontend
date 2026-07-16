import { Message } from "./Message";
import { User } from "./User";

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
