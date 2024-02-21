import { chatAppAPI } from "@/shared/APIs";

export const createRoom = (values: { participantId: string }) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_CHAT_ENDPOINT;
  return chatAppAPI.post(ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
