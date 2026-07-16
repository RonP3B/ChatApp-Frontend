import { chatAppAPI } from "@/shared/APIs";

export const getRooms = () => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_CHAT_ENDPOINT;
  return chatAppAPI.get(ENDPOINT);
};
