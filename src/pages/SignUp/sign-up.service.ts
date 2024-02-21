import { chatAppAPI } from "@/shared/APIs";
import { SignUpValues } from "./interfaces";

export const signUp = (values: SignUpValues) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_USERS_ENDPOINT;
  const formData = new FormData();

  Object.keys(values).forEach((key) => {
    const value = values[key as keyof SignUpValues];
    if (value) formData.append(key, value);
  });

  return chatAppAPI.post(ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
