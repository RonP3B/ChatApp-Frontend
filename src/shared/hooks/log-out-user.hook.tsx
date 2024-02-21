import { useAuthContext, useSocketContext } from "@/shared/contexts";
import { useConfirm, ConfirmOptions } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";
import { logOut } from "../services";
import { getAxiosErrorMsg } from "../utils";
import { useToast } from "./toast.hook";

export const useLogOutUser = () => {
  const { setAuth } = useAuthContext();
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
      setAuth({ token: "", user: null });
      disconnectSocket();
      navigate("/sign-in");
    } catch (error) {
      const errorMsg: string = getAxiosErrorMsg(error, "log out");
      toast(errorMsg, { type: "error" });
    }
  };

  return logOutUser;
};
