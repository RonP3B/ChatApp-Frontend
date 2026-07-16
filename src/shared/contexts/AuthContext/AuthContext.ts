import { createContext } from "react";
import { AuthActions, AuthState } from "./types";

export const AuthStateContext = createContext<AuthState | null>(null);

export const AuthActionsContext = createContext<AuthActions | null>(null);
