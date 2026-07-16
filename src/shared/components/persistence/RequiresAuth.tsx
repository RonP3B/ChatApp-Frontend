import { ConfirmProvider } from "material-ui-confirm";
import { Outlet, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { authStatus, useAuth } from "@/shared/contexts/AuthContext";
import {
  ChatContextProvider,
  ColorModeContextProvider,
  SocketContextProvider,
} from "@/shared/contexts";

export const RequiresAuth: React.FC = () => {
  const auth = useAuth();

  if (auth.status === authStatus.Authenticated) {
    return (
      <SocketContextProvider>
        <ColorModeContextProvider>
          <ConfirmProvider>
            <ChatContextProvider>
              <Outlet />
            </ChatContextProvider>
          </ConfirmProvider>
          <ToastContainer containerId="B" />
        </ColorModeContextProvider>
      </SocketContextProvider>
    );
  }

  return <Navigate to="/sign-in" replace />;
};
