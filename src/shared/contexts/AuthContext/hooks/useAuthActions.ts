import { useContext } from "react";
import { AuthActionsContext } from "../AuthContext";
import { AuthActions } from "../types";

export function useAuthActions(): AuthActions {
  const actions = useContext(AuthActionsContext);

  if (!actions) {
    throw new Error("useAuthActions must be used within AuthProvider");
  }

  return actions;
}
