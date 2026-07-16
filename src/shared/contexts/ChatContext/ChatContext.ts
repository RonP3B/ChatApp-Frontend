import { createContext } from "react";
import { Room } from "@/shared/types";
import { ChatContextActions } from "./ChatContextActions";

export const SelectedChatContext = createContext<Room | null | undefined>(
  undefined
);

export const ChatRoomsContext = createContext<Room[] | null>(null);

export const ChatDraftContext = createContext<string | null>(null);

export const ChatActionsContext = createContext<ChatContextActions | null>(
  null
);
