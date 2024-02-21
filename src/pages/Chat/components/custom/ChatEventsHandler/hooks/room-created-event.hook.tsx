import { useChatContext } from "@/shared/contexts";
import { Room } from "@/shared/interfaces";
import { useCallback } from "react";

export const useRoomCreatedEvent = () => {
  const { chatContextActions } = useChatContext();
  const { setRooms } = chatContextActions;

  const onRoomCreated = useCallback(
    (room: Room): void => {
      setRooms((prev) => [room, ...prev]);
    },
    [setRooms]
  );

  return onRoomCreated;
};
