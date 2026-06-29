import { toast, ToastOptions } from "react-toastify";
import { useColorMode } from "../contexts/ColorModeContext";

export const useToast = () => {
  const { mode } = useColorMode();

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
