import { createContext } from "react";
import { AuthState } from "./auth-context.type";
import { AuthActions } from "./auth-context.interface";

export const AuthStateContext = createContext<AuthState | null>(null);

export const AuthActionsContext = createContext<AuthActions | null>(null);
