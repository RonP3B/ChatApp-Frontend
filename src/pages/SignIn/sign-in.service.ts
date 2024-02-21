import { chatAppAPI } from "@/shared/APIs";
import { SignInValues } from "./interfaces";

export const signIn = (values: SignInValues) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_SIGN_IN_ENDPOINT;
  return chatAppAPI.post(ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};
