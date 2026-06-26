import { User } from "@/shared/interfaces";
import { AuthStatus } from "./auth.context.const";

export type AuthenticatedUser = {
  status: typeof AuthStatus.Authenticated;
  token: string;
  user: User;
};

export type UnauthenticatedUser = {
  status: typeof AuthStatus.Unauthenticated;
  token: "";
  user: null;
};

export type AuthState = AuthenticatedUser | UnauthenticatedUser;

export type AuthActions = {
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};
