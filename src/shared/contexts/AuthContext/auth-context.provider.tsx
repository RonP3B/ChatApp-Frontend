import { ReactNode, useMemo, useState } from "react";
import { AuthActionsContext, AuthStateContext } from "./auth-context";
import { AuthState } from "./auth-context.type";
import { initialAuthState } from "./auth-context.const";
import { AuthActions } from "./auth-context.interface";

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
