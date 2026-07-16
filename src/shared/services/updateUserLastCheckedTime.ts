import { chatAppAPI } from "@/shared/APIs";

export const updateUserLastCheckedTime = (values: {
  roomId: string;
  userId: string;
}) => {
  const ENDPOINT: string = import.meta.env
    .VITE_CHATAPP_CHAT_USER_LAST_CHECKED_ENDPOINT;
  return chatAppAPI.put(ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
