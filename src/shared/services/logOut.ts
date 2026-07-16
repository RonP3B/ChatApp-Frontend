import { chatAppAPI } from "@/shared/APIs";

export const logOut = () => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_LOGOUT_ENDPOINT;
  return chatAppAPI.get(ENDPOINT);
};
