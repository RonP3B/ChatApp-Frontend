import { useContext } from "react";
import { SocketContext } from "./SocketContext";
import { SocketContextValue } from "./SocketContextValue";

export const useSocket = (): SocketContextValue => {
  const socket = useContext(SocketContext);

  if (!socket) {
    throw new Error("useSocket must be used within SocketContextProvider");
  }

  return socket;
};
