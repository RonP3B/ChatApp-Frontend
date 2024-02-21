import { useEffect, useState } from "react";
import socketio, { Socket } from "socket.io-client";
import { useAuthContext } from "..";
import { SocketContext } from "./socket.context";
import { SocketEvent } from "@/shared/enums";
import { AxiosResponse } from "axios";
import { getAccessToken, validateRefreshToken } from "@/shared/services";

export const SocketContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { auth } = useAuthContext();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [reconnectionAttempts, setReconnectionAttempts] = useState<number>(0);

  useEffect(() => {
    connectSocket(auth.token);
  }, [auth.token]);

  useEffect(() => {
    if (!socket) return;

    const onConnectError = async (error: Error) => {
      try {
        if (error.message === "Missing or invalid token") {
          let res: AxiosResponse = await validateRefreshToken();
          if (!res.data.isValidRefreshToken || reconnectionAttempts > 4) return;
          res = await getAccessToken();
          connectSocket(res.data.accessToken as string);
          setReconnectionAttempts((prev) => prev + 1);
        } else {
          console.error("Socket connection error:", error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    socket.on(SocketEvent.CONNECT_ERROR, onConnectError);

    return () => {
      socket.off(SocketEvent.CONNECT_ERROR, onConnectError);
    };
  }, [socket, reconnectionAttempts]);

  const connectSocket = (token: string): void => {
    setSocket(
      socketio(import.meta.env.VITE_CHATAPP_SOCKET, {
        withCredentials: true,
        auth: { token },
      })
    );
  };

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
