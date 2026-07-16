import { AuthState } from "./AuthState";

export interface AuthActions {
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
}
