import { authStatus, useAuth } from "@/shared/contexts/AuthContext";
import { Outlet, Navigate } from "react-router";

export const RequiresUnauth: React.FC = () => {
  const auth = useAuth();

  return auth.status === authStatus.Unauthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};
