import { useContext } from "react";
import { SocketContext } from "./socket.context";
import { SocketContextProps } from "./socket.context.interface";

export const useSocketContext = (): SocketContextProps => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error(
      "useSocketContext must be used within SocketContextProvider"
    );
  }

  return socketContext;
};
