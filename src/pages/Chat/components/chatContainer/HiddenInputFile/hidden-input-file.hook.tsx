import { ChangeEvent } from "react";
import { SendMessageValues } from "@/pages/Chat/interfaces";
import { useAuthContext, useChatContext } from "@/shared/contexts";
import { useToast } from "@/shared/hooks";
import { Message, User } from "@/shared/interfaces";
import { nanoid } from "nanoid";
import { FileTypeMaxSizes, MessageType } from "@/shared/enums";
import {
  addMessageToSelectedChat,
  createMessageToDisplay,
  createMessageToSend,
  handleMessageSending,
  handleMessageSendingFailure,
} from "@/pages/Chat/utils";

export const useHiddenInputFile = () => {
  const { chatContextActions } = useChatContext();
  const { chatContextValues } = useChatContext();
  const { auth } = useAuthContext();
  const toast = useToast();

  const handleOnChangeInput = (
    event: ChangeEvent<HTMLInputElement>,
    fileType: string
  ): void => {
    const file = event.target.files?.[0];
    if (!file) return;
    sendFileMessage(file, fileType.toLowerCase());
    event.target.value = "";
  };

  const addSenderNameToGroupMessage = (
    messageToSend: SendMessageValues
  ): void => {
    if (chatContextValues.selectedChat!.isGroup) {
      messageToSend["senderName"] = auth.user!.username;
    }
  };

  const sendFileMessage = async (
    file: File,
    fileType: string
  ): Promise<void> => {
    const messageToDisplayId: string = nanoid();

    try {
      const explicitFileType: string = fileType.split("/")[0];

      if (!validateFileMessage(explicitFileType, file)) return;

      const messageToSend: SendMessageValues = createMessageToSend(
        auth.user!.id,
        chatContextValues.selectedChat!.id,
        MessageType[explicitFileType.toUpperCase() as keyof typeof MessageType],
        file
      );

      addSenderNameToGroupMessage(messageToSend);

      const messageToDisplay: Message = await createMessageToDisplay(
        messageToSend,
        messageToDisplayId,
        auth.user as User,
        file
      );

      addMessageToSelectedChat(
        messageToDisplay,
        chatContextActions.setSelectedChat
      );

      await handleMessageSending(
        messageToSend,
        auth.user!.username,
        `${explicitFileType} sent.`,
        chatContextActions.setRooms
      );
    } catch (error) {
      handleMessageSendingFailure(
        messageToDisplayId,
        chatContextActions.setSelectedChat
      );
    }
  };

  const validateFileMessage = (
    explicitFileType: string,
    file: File
  ): boolean => {
    const isFileTypeValid = validateFileType(explicitFileType, file);
    const isFileSizeValid = validateFileSize(explicitFileType, file);
    return isFileTypeValid && isFileSizeValid;
  };

  const validateFileType = (explicitFileType: string, file: File): boolean => {
    if (explicitFileType !== file.type.split("/")[0]) {
      toast("Invalid file type. Please choose a valid file type.", {
        type: "error",
      });
      return false;
    }

    return true;
  };

  const validateFileSize = (explicitFileType: string, file: File): boolean => {
    const fileTypeMaxSizesKey =
      explicitFileType.toUpperCase() as keyof typeof FileTypeMaxSizes;

    if (file.size > FileTypeMaxSizes[fileTypeMaxSizesKey]) {
      toast(
        `File size must be equal or less than ${
          FileTypeMaxSizes[fileTypeMaxSizesKey] / (1024 * 1024)
        }MB.`,
        { type: "error" }
      );
      return false;
    }

    return true;
  };

  return { handleOnChangeInput };
};
