import { User } from "@/shared/interfaces";
import { ReactNode, useState } from "react";
import { AuthContext } from "./auth.context";

export const AuthContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [auth, setAuth] = useState<{ token: string; user: User | null }>({
    token: "",
    user: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
