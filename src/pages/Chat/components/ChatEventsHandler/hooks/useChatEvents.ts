import { useMessageReceivedEvent } from "./useMessageReceivedEvent";
import { useRoomCreatedEvent } from "./useRoomCreatedEvent";
import { useUserOnlineStatusEvent } from "./useUserOnlineStatusEvent";

export const useChatEvents = () => {
  const onMessageReceived = useMessageReceivedEvent();
  const onRoomCreated = useRoomCreatedEvent();
  const onUserOnlineStatus = useUserOnlineStatusEvent();
  return { onMessageReceived, onRoomCreated, onUserOnlineStatus };
};
