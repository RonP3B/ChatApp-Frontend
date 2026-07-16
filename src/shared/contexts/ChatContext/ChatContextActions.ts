import { Room } from "@/shared/types";
import { Dispatch, SetStateAction } from "react";

export interface ChatContextActions {
  handleRoomSelection: (room: Room) => void;
  handleArrowBack: () => void;
  setSelectedChat: Dispatch<SetStateAction<Room | null>>;
  setRooms: Dispatch<SetStateAction<Room[]>>;
  setTextMsgToSend: Dispatch<SetStateAction<string>>;
}
