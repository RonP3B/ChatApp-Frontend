import { useContext } from "react";
import { AuthActionsContext, AuthStateContext } from "./auth.context";
import { AuthActions, AuthState, AuthenticatedUser } from "./auth.context.type";
import { AuthStatus } from "./auth.context.const";

export function useAuth(): AuthState {
  const auth = useContext(AuthStateContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}

export function useAuthActions(): AuthActions {
  const actions = useContext(AuthActionsContext);

  if (!actions) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }

  return actions;
}

export function useCurrentUser(): AuthenticatedUser {
  const auth = useAuth();

  if (auth.status !== AuthStatus.Authenticated) {
    throw new Error("Expected authenticated auth state");
  }

  return auth;
}
