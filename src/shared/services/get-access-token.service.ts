import { chatAppAPI } from "@/shared/APIs";

export const getAccessToken = () => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_REFRESH_TOKEN_ENDPOINT;
  return chatAppAPI.get(ENDPOINT);
};
