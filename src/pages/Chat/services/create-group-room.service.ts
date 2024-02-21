import { chatAppAPI } from "@/shared/APIs";
import { CreateGroupRoomValues } from "../interfaces";

export const createGroupRoom = (values: CreateGroupRoomValues) => {
  const ENDPOINT: string = import.meta.env.VITE_CHATAPP_CHAT_GROUP_ENDPOINT;
  const formData: FormData = new FormData();

  Object.keys(values).forEach((key) => {
    const value = values[key as keyof CreateGroupRoomValues];

    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item));
    } else if (value) {
      formData.append(key, value);
    }
  });

  return chatAppAPI.post(ENDPOINT, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
