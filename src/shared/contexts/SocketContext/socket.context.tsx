import { createContext } from "react";
import { SocketContextProps } from "./socket.context.interface";

export const SocketContext = createContext<SocketContextProps>({
  socket: null,
  disconnectSocket: () => {},
});
