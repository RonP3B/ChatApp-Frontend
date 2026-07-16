import { chatAppAPI } from "@/shared/APIs";

export const getUserActivation = (username: string) => {
  const ENDPOINT: string = import.meta.env
    .VITE_CHATAPP_USERS_ACTIVATION_ENDPOINT;
  return chatAppAPI.get(`${ENDPOINT}/${username}`);
};
