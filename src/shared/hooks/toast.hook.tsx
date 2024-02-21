import { toast, ToastOptions } from "react-toastify";
import { useColorModeContext } from "../contexts";

export const useToast = () => {
  const { mode } = useColorModeContext();

  const showToast = (message: string, options: ToastOptions = {}) => {
    const toastOptions: ToastOptions = {
      ...options,
      theme: mode,
      containerId: "B",
    };

    toast(message, toastOptions);
  };

  return showToast;
};
