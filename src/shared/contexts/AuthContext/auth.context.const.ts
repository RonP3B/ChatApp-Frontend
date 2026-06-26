import { UnauthenticatedUser } from "./auth.context.type";

export const AuthStatus = {
  Authenticated: "authenticated",
  Unauthenticated: "unauthenticated",
} as const;

export const initialAuthState: UnauthenticatedUser = {
  status: AuthStatus.Unauthenticated,
  token: "",
  user: null,
};
