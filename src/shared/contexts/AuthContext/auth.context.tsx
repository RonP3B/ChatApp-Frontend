import { createContext } from "react";
import { AuthActions, AuthState } from "./auth.context.type";

export const AuthStateContext = createContext<AuthState | null>(null);

export const AuthActionsContext = createContext<AuthActions | null>(null);
