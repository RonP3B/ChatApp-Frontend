import { ReactNode, useMemo, useState } from "react";
import { AuthActionsContext, AuthStateContext } from "./AuthContext";
import { AuthActions, AuthState } from "./types";
import { initialAuthState } from "./constants";

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<AuthState>(initialAuthState);
  const actions: AuthActions = useMemo(() => ({ setAuth }), []);

  return (
    <AuthActionsContext.Provider value={actions}>
      <AuthStateContext.Provider value={auth}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionsContext.Provider>
  );
};
