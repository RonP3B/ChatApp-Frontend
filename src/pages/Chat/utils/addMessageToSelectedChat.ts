import { Message, Room } from "@/shared/types";
import { playAudio } from "./playAudio";
import popSound from "@/assets/audio/popSound.mp3";

export const addMessageToSelectedChat = (
  message: Message,
  setSelectedChat: React.Dispatch<React.SetStateAction<Room | null>>
): void => {
  setSelectedChat((prev) => {
    if (!prev || prev.id !== message.roomId) return prev;
    return {
      ...prev,
      messages: [...prev.messages, message],
    };
  });
  playAudio(popSound);
};
