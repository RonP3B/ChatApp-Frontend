import { useContext } from "react";
import { SocketContext } from "./socket-context";
import { SocketContextValue } from "./socket-context.interface";

export const useSocketContext = (): SocketContextValue => {
  const socketContext = useContext(SocketContext);

  if (!socketContext) {
    throw new Error(
      "useSocketContext must be used within SocketContextProvider"
    );
  }

  return socketContext;
};
