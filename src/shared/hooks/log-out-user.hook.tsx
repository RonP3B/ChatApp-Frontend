import { useConfirm, ConfirmOptions } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services";
import { getAxiosErrorMsg } from "../utils";
import { useToast } from "./toast.hook";
import { useAuthActions, initialAuthState } from "../contexts/AuthContext";
import { useSocketContext } from "../contexts/SocketContext";

export const useLogOutUser = () => {
  const { setAuth } = useAuthActions();
  const { disconnectSocket } = useSocketContext();
  const navigate = useNavigate();
  const confirm = useConfirm();
  const toast = useToast();

  const logOutUser = async (): Promise<void> => {
    try {
      const confirmOptions: ConfirmOptions = {
        title: "Confirmation",
        description: "Are you sure you want to log out?",
        cancellationText: "Cancel",
      };
      await confirm(confirmOptions);
      await logOut();
      setAuth(initialAuthState);
      disconnectSocket();
      navigate("/sign-in");
    } catch (error) {
      const errorMsg: string = getAxiosErrorMsg(error, "log out");
      toast(errorMsg, { type: "error" });
    }
  };

  return logOutUser;
};
