import { useEffect, useRef, useState } from "react";
import socketio, { Socket } from "socket.io-client";
import { SocketContext } from "./socket-context";
import { SocketEvent } from "@/shared/enums";
import { useCurrentUser } from "../AuthContext";
import { useRefreshToken } from "@/shared/hooks";

const MAX_RECONNECTION_ATTEMPTS = 5;

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUser = useCurrentUser();
  const { refreshAccessToken } = useRefreshToken();
  const [socket, setSocket] = useState<Socket | null>(null);
  const reconnectionAttemptsRef = useRef<number>(0);
  const refreshAccessTokenRef = useRef(refreshAccessToken);

  refreshAccessTokenRef.current = refreshAccessToken;

  useEffect(() => {
    const newSocket = socketio(import.meta.env.VITE_CHATAPP_SOCKET, {
      withCredentials: true,
      auth: { token: currentUser.token },
    });

    setSocket(newSocket);

    const onConnect = () => {
      reconnectionAttemptsRef.current = 0;
    };

    const onConnectError = async (error: Error) => {
      try {
        if (error.message === "Missing or invalid token") {
          if (reconnectionAttemptsRef.current >= MAX_RECONNECTION_ATTEMPTS) {
            return;
          }

          const newToken = await refreshAccessTokenRef.current();

          if (!newToken) return;

          if (!newSocket.connected) {
            newSocket.auth = { token: newToken };
            newSocket.connect();
            reconnectionAttemptsRef.current += 1;
          }
        } else {
          console.error("Socket connection error:", error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    newSocket.on(SocketEvent.CONNECT, onConnect);
    newSocket.on(SocketEvent.CONNECT_ERROR, onConnectError);

    return () => {
      newSocket.off(SocketEvent.CONNECT, onConnect);
      newSocket.off(SocketEvent.CONNECT_ERROR, onConnectError);
      newSocket.disconnect();
      setSocket(null);
    };
  }, [currentUser.token]);

  const disconnectSocket = (): void => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, disconnectSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
