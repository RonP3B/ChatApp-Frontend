import { SocketEvent } from "@/shared/enums";
import { useEffect } from "react";
import { useChatEvents } from "./hooks/useChatEvents";
import { useSocket } from "@/shared/contexts/SocketContext";
import { ChatEventsHandlerProps } from "./ChatEventsHandlerProps";

export const ChatEventsHandler: React.FC<ChatEventsHandlerProps> = ({
  children,
}) => {
  const { socket } = useSocket();
  const events = useChatEvents();

  useEffect(() => {
    if (!socket) return;

    socket.on(SocketEvent.MESSAGE_RECEIVED, events.onMessageReceived);
    socket.on(SocketEvent.ROOM_CREATED, events.onRoomCreated);
    socket.on(SocketEvent.USER_ONLINE_STATUS, events.onUserOnlineStatus);

    return () => {
      socket.off(SocketEvent.MESSAGE_RECEIVED, events.onMessageReceived);
      socket.off(SocketEvent.ROOM_CREATED, events.onRoomCreated);
      socket.off(SocketEvent.USER_ONLINE_STATUS, events.onUserOnlineStatus);
    };
  }, [socket, events]);

  return children;
};
