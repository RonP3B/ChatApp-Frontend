import { Room } from "@/shared/interfaces";
import { Dispatch, SetStateAction } from "react";

export interface ChatContextProps {
  chatContextValues: ChatContextValues;
  chatContextActions: ChatContextActions;
}

interface ChatContextValues {
  selectedChat: Room | null;
  rooms: Room[];
}

interface ChatContextActions {
  handleRoomSelection: (room: Room) => void;
  handleArrowBack: () => void;
  setSelectedChat: Dispatch<SetStateAction<Room | null>>;
  setRooms: Dispatch<SetStateAction<Room[]>>;
}
