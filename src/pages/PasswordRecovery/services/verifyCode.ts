import { chatAppAPI } from "@/shared/APIs";

export const verifyCode = (values: { code: string }, username: string) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_VERIFY_CODE_ENDPOINT;
  return chatAppAPI.post(`${ENDPOINT}/${username}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
