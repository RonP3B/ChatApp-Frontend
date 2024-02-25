import { createContext } from "react";
import { ChatContextProps } from "./chat.context.interface";

export const ChatContext = createContext<ChatContextProps>({
  chatContextValues: {
    selectedChat: null,
    rooms: [],
    textMsgToSend: "",
  },
  chatContextActions: {
    handleRoomSelection: () => {},
    handleArrowBack: () => {},
    setSelectedChat: () => {},
    setRooms: () => {},
    setTextMsgToSend: () => {},
  },
});
