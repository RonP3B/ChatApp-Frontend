import { chatAppAPI } from "@/shared/APIs";

export const validateRefreshToken = () => {
  const ENDPOINT: string = import.meta.env
    .VITE_CHATAPP_VALID_REFRESH_TOKEN_ENDPOINT;
  return chatAppAPI.get(ENDPOINT);
};
