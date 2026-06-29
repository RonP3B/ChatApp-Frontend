import { useChatActions } from "@/shared/contexts/ChatContext";
import { Room } from "@/shared/interfaces";
import { useCallback } from "react";

export const useRoomCreatedEvent = () => {
  const { setRooms } = useChatActions();

  const onRoomCreated = useCallback(
    (room: Room): void => {
      setRooms((prev) => [room, ...prev]);
    },
    [setRooms]
  );

  return onRoomCreated;
};
