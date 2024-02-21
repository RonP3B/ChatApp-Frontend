import { createContext } from "react";
import { ChatContextProps } from "./chat.context.interface";

export const ChatContext = createContext<ChatContextProps>({
  chatContextValues: {
    selectedChat: null,
    rooms: [],
  },
  chatContextActions: {
    handleRoomSelection: () => {},
    handleArrowBack: () => {},
    setSelectedChat: () => {},
    setRooms: () => {},
  },
});
