import { useConfirm, ConfirmOptions } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services";
import { getAxiosErrorMessage } from "../utils";
import { useToast } from "./toast.hook";
import { useAuthActions, initialAuthState } from "../contexts/AuthContext";
import { useSocket } from "../contexts/SocketContext";

export const useLogOutUser = () => {
  const { setAuth } = useAuthActions();
  const { disconnectSocket } = useSocket();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const toast = useToast();

  const logOutUser = async (): Promise<void> => {
    const confirmOptions: ConfirmOptions = {
      title: "Confirmation",
      description: "Are you sure you want to log out?",
      cancellationText: "Cancel",
    };

    const { confirmed } = await confirm(confirmOptions);

    if (!confirmed) return;

    try {
      await logOut();
      setAuth(initialAuthState);
      disconnectSocket();
      navigate("/sign-in");
    } catch (error) {
      toast(getAxiosErrorMessage(error), {
        type: "error",
        containerId: "A",
      });
    }
  };

  return logOutUser;
};
