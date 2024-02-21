import { Message, Room } from "@/shared/interfaces";

export const updateRoomMessages = (
  prev: Room[],
  newMessage: Message,
  lastMessage: string,
  senderName: string
): Room[] => {
  return prev
    .map((room) => {
      if (room.id !== newMessage.roomId) return room;
      return {
        ...room,
        lastMessageDate: newMessage.date,
        messages: [...room.messages, newMessage],
        lastMessage: `${room.isGroup ? `${senderName}: ` : ""}${lastMessage}`,
      };
    })
    .sort(sortRooms);
};

const sortRooms = (a: Room, b: Room): number => {
  const getTime = (item: Room) =>
    item.lastMessageDate ? new Date(item.lastMessageDate).getTime() : 0;
  return getTime(b) - getTime(a);
};
