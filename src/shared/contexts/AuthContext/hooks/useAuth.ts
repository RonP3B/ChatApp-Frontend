import { useContext } from "react";
import { AuthStateContext } from "../AuthContext";
import { AuthState } from "../types";

export function useAuth(): AuthState {
  const auth = useContext(AuthStateContext);

  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return auth;
}
