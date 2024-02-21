import { chatAppAPI } from "@/shared/APIs";
import { SendMessageValues } from "../interfaces";

export const sendMessage = (values: SendMessageValues) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_MESSAGES_ENDPOINT;
  const formData: FormData = new FormData();

  Object.keys(values).forEach((key) => {
    const value = values[key as keyof SendMessageValues];
    if (value) formData.append(key, value);
  });

  return chatAppAPI.post(ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
