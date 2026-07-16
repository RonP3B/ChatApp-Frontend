import { createContext } from "react";
import { SocketContextValue } from "./SocketContextValue";

export const SocketContext = createContext<SocketContextValue | null>(null);
