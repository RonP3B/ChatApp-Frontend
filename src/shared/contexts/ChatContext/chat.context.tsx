import { createContext } from "react";
import { Room } from "@/shared/interfaces";
import { ChatContextActions } from "./chat.context.interface";

export const SelectedChatContext = createContext<Room | null | undefined>(
  undefined
);

export const ChatRoomsContext = createContext<Room[] | null>(null);

export const ChatDraftContext = createContext<string | null>(null);

export const ChatActionsContext = createContext<ChatContextActions | null>(
  null
);
