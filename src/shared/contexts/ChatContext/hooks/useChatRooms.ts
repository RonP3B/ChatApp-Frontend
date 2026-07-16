import { Room } from "@/shared/types";
import { useContext } from "react";
import { ChatRoomsContext } from "../ChatContext";

export const useChatRooms = (): Room[] => {
  const rooms = useContext(ChatRoomsContext);

  if (!rooms) {
    throw new Error("useChatRooms must be used within a ChatContextProvider");
  }

  return rooms;
};
