import { Socket } from "socket.io-client";

export interface SocketContextValue {
  socket: Socket | null;
  disconnectSocket: () => void;
}
