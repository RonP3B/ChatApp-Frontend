import { useChatContext } from "@/shared/contexts";
import { Room, User, UserOnlineStatusUpdated } from "@/shared/interfaces";
import { useCallback } from "react";

export const useUserOnlineStatusEvent = () => {
  const { chatContextActions, chatContextValues } = useChatContext();
  const { setRooms, setSelectedChat } = chatContextActions;
  const { rooms, selectedChat } = chatContextValues;

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
      const updatedParticipants: User[] = updateParticipantsOnlineStatus(
        selectedChat!.participants,
        user.id,
        user.isOnline
      );

      setSelectedChat({ ...selectedChat!, participants: updatedParticipants });
    },
    [selectedChat, setSelectedChat]
  );

  const updateRooms = useCallback(
    (user: UserOnlineStatusUpdated): void => {
      const updatedRooms: Room[] = rooms.map((room) => {
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
      });

      setRooms(updatedRooms);
    },
    [rooms, setRooms]
  );

  const onUserOnlineStatus = useCallback(
    (user: UserOnlineStatusUpdated): void => {
      updateRooms(user);

      if (selectedChat) {
        const isUserInSelectedChat: boolean = user.rooms.some(
          (room) => room.id === selectedChat!.id
        );
        isUserInSelectedChat && updateSelectedChat(user);
      }
    },
    [selectedChat, updateRooms, updateSelectedChat]
  );

  return onUserOnlineStatus;
};
