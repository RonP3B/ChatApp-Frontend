import { User, UserOnlineStatusUpdated } from "@/shared/types";
import { useCallback } from "react";
import { useChatActions } from "@/shared/contexts/ChatContext";

export const useUserOnlineStatusEvent = () => {
  const { setRooms, setSelectedChat } = useChatActions();

  const updateParticipantsOnlineStatus = (
    participants: User[],
    userId: string,
    isOnline: boolean
  ): User[] => {
    return participants.map((participant) => {
      if (participant.id !== userId) return participant;
      return { ...participant, isOnline };
    });
  };

  const updateSelectedChat = useCallback(
    (user: UserOnlineStatusUpdated): void => {
      setSelectedChat((prev) => {
        if (!prev) return prev;

        const isUserInSelectedChat = prev.participants.some(
          (participant) => participant.id === user.id
        );

        if (!isUserInSelectedChat) return prev;

        const updatedParticipants: User[] = updateParticipantsOnlineStatus(
          prev.participants,
          user.id,
          user.isOnline
        );

        return { ...prev, participants: updatedParticipants };
      });
    },
    [setSelectedChat]
  );

  const updateRooms = useCallback(
    (user: UserOnlineStatusUpdated): void => {
      setRooms((prev) =>
        prev.map((room) => {
          const isUserInRoom: boolean = user.rooms.some(
            (userInRoom) => userInRoom.id === room.id
          );

          if (!isUserInRoom) return room;

          const updatedParticipants: User[] = updateParticipantsOnlineStatus(
            room.participants,
            user.id,
            user.isOnline
          );

          return { ...room, participants: updatedParticipants };
        })
      );
    },
    [setRooms]
  );

  const onUserOnlineStatus = useCallback(
    (user: UserOnlineStatusUpdated): void => {
      updateRooms(user);
      updateSelectedChat(user);
    },
    [updateRooms, updateSelectedChat]
  );

  return onUserOnlineStatus;
};
