import { useSocketContext } from "@/shared/contexts";
import { SocketEvent } from "@/shared/enums";
import { useEffect } from "react";
import { useChatEvents } from "./hooks/chat-events.hook";

export const ChatEventsHandler: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { socket } = useSocketContext();
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
