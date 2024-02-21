import { ConfirmProvider } from "material-ui-confirm";
import { Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  ChatContextProvider,
  ColorModeContextProvider,
  SocketContextProvider,
  useAuthContext,
} from "@/shared/contexts";

export const RequiresAuth: React.FC = () => {
  const { auth } = useAuthContext();

  if (auth.token) {
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
