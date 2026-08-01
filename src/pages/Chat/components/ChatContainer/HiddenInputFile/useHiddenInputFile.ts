import { ChangeEvent } from "react";
import { useSendFileMessage } from "@/pages/Chat/hooks";

export const useHiddenInputFile = () => {
  const { sendFileMessage } = useSendFileMessage();

  const handleOnChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    fileType: string
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    sendFileMessage(file, fileType.toLowerCase());
    event.target.value = "";
  };

  return { handleOnChangeInput };
};
