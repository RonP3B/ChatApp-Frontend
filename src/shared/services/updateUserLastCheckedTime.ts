import { chatAppAPI } from "@/shared/APIs";

export const updateUserLastCheckedTime = (values: {
  roomId: string;
  userId: string;
}) => {
  const ENDPOINT: string = import.meta.env
    .VITE_CHATAPP_CHAT_USER_LAST_CHECKED_ENDPOINT;

  return chatAppAPI.put(ENDPOINT, JSON.stringify(values), {
    headers: { "Content-Type": "application/json" },
  });
};

export const updateUserLastCheckedTimeOnUnload = (values: {
  roomId: string;
  userId: string;
}): void => {
  const BASE_URL: string = import.meta.env.VITE_CHATAPP_API;

  const BEACON_ENDPOINT: string = import.meta.env
    .VITE_CHATAPP_CHAT_USER_LAST_CHECKED_BEACON_ENDPOINT;

  const blob = new Blob([JSON.stringify(values)], { type: "application/json" });

  const queued = navigator.sendBeacon(`${BASE_URL}${BEACON_ENDPOINT}`, blob);
  if (!queued) console.error("sendBeacon failed to queue last-checked update.");
};
