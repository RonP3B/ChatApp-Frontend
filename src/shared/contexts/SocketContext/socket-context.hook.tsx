import { useContext } from "react";
import { SocketContext } from "./socket-context";
import { SocketContextValue } from "./socket-context.interface";

export const useSocket = (): SocketContextValue => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within SocketContextProvider");
  }

  return socket;
};
