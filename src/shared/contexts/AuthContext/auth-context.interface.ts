import { User } from "@/shared/interfaces";
import { AuthStatusValues, AuthState } from "./auth-context.type";

export interface AuthenticatedUser {
  status: Extract<AuthStatusValues, "authenticated">;
  token: string;
  user: User;
}

export interface UnauthenticatedUser {
  status: Extract<AuthStatusValues, "unauthenticated">;
}

export interface AuthActions {
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}
