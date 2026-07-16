import { authStatus } from "../constants";
import { AuthenticatedUser } from "../types";
import { useAuth } from "./useAuth";

export function useCurrentUser(): AuthenticatedUser {
  const auth = useAuth();

  if (auth.status !== authStatus.Authenticated) {
    throw new Error("Expected authenticated auth state");
  }

  return auth;
}
