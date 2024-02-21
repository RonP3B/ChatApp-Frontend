import { createContext } from "react";
import { AuthContextProps } from "./auth..context.interface";

export const AuthContext = createContext<AuthContextProps>({
  auth: { token: "", user: null },
  setAuth: () => {},
});
