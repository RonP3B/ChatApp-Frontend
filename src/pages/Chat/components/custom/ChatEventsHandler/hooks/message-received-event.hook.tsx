import { useCallback } from "react";
import musicBoxSound from "@/assets/audio/music-box-sound.mp3";
import { useChatContext } from "@/shared/contexts";
import { Message } from "@/shared/interfaces";
import {
  addMessageToSelectedChat,
  playAudio,
  updateRoomMessages,
} from "@/pages/Chat/utils";

export const useMessageReceivedEvent = () => {
  const { chatContextActions, chatContextValues } = useChatContext();
  const { setRooms, setSelectedChat } = chatContextActions;
  const { selectedChat } = chatContextValues;

  const updateRooms = useCallback(
    (message: Message): void => {
      const isText: boolean = message.messageType === "TEXT";
      const textMessage: string = message.content;
      const fileMessage: string = `${message.messageType.toLowerCase()} sent.`;
      const newLastMessage: string = isText ? textMessage : fileMessage;
      const senderName: string = message.sender.username;
      setRooms((prev) =>
        updateRoomMessages(prev, message, newLastMessage, senderName)
      );
    },
    [setRooms]
  );

  const updateUnreadMessages = useCallback(
    (message: Message): void => {
      setRooms((prev) =>
        prev.map((room) => {
          if (room.id !== message.roomId) return room;
          return { ...room, unreadMessages: room.unreadMessages + 1 };
        })
      );
    },
    [setRooms]
  );

  const onMessageReceived = useCallback(
    (message: Message): void => {
      if (selectedChat?.id === message.roomId) {
        addMessageToSelectedChat(message, setSelectedChat);
      }

      if (!selectedChat || selectedChat.id !== message.roomId) {
        updateUnreadMessages(message);
        playAudio(musicBoxSound);
      }

      updateRooms(message);
    },
    [selectedChat, setSelectedChat, updateRooms, updateUnreadMessages]
  );

  return onMessageReceived;
};
