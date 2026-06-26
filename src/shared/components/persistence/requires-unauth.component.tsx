import { AuthStatus, useAuth } from "@/shared/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";

export const RequiresUnauth: React.FC = () => {
  const auth = useAuth();

  return auth.status === AuthStatus.Unauthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
