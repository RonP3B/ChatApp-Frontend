import { MessageType } from "@/shared/enums";
import { User } from "@/shared/types";

export interface MessageProps {
  user: User;
  time: Date;
  messageType: MessageType;
  content: string;
  error: boolean;
}
