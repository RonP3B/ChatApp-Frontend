import { createContext } from "react";
import { SocketContextValue } from "./socket-context.interface";

export const SocketContext = createContext<SocketContextValue | null>(null);
