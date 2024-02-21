import { useContext } from "react";
import { AuthContextProps } from "./auth..context.interface";
import { AuthContext } from "./auth.context";

export const useAuthContext = (): AuthContextProps => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return auth;
};
