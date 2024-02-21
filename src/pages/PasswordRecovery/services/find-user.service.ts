import { chatAppAPI } from "@/shared/APIs";

export const findUser = (values: { username: string }) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_SEND_CODE_ENDPOINT;
  return chatAppAPI.post(ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
