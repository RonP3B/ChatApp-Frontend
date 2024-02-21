import { useAuthContext } from "@/shared/contexts";
import { Outlet, Navigate } from "react-router-dom";

export const RequiresUnauth: React.FC = () => {
  const { auth } = useAuthContext();
  return !auth.token ? <Outlet /> : <Navigate to="/" replace />;
};
