import { Message, Room } from "@/shared/interfaces";
import { playAudio } from "./play-audio.util";
import popSound from "@/assets/audio/pop-sound.mp3";

export const addMessageToSelectedChat = (
  message: Message,
  setSelectedChat: React.Dispatch<React.SetStateAction<Room | null>>
): void => {
  setSelectedChat((prev) => ({
    ...prev!,
    messages: [...prev!.messages, message],
  }));
  playAudio(popSound);
};
