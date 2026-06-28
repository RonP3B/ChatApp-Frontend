import { UnauthenticatedUser } from "./auth-context.interface";

export const AuthStatus = {
  Authenticated: "authenticated",
  Unauthenticated: "unauthenticated",
} as const;

export const initialAuthState: UnauthenticatedUser = {
  status: AuthStatus.Unauthenticated,
};
