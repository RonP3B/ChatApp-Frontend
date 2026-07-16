import { chatAppAPI } from "@/shared/APIs";

export const resetPassword = (
  values: { newPassword: string },
  username: string
) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_RESET_PASSWORD_ENDPOINT;
  return chatAppAPI.patch(`${ENDPOINT}/${username}`, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
