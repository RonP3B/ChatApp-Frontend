import { useMessageReceivedEvent } from "./message-received-event.hook";
import { useRoomCreatedEvent } from "./room-created-event.hook";
import { useUserOnlineStatusEvent } from "./user-online-status-event.hook";

export const useChatEvents = () => {
  const onMessageReceived = useMessageReceivedEvent();
  const onRoomCreated = useRoomCreatedEvent();
  const onUserOnlineStatus = useUserOnlineStatusEvent();

  return { onMessageReceived, onRoomCreated, onUserOnlineStatus };
};
