import { chatAppAPI } from "@/shared/APIs";

export const getUsers = (username: string, signal?: AbortSignal) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_USERS_ENDPOINT;
  return chatAppAPI.get(`${ENDPOINT}?username=${username}`, { signal });
};
