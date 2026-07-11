import { ChangeEvent } from "react";
import { SendMessageValues } from "@/pages/Chat/interfaces";
import { useToast } from "@/shared/hooks";
import { Message } from "@/shared/interfaces";
import { nanoid } from "nanoid";
import { FileTypeMaxSizes, MessageType } from "@/shared/enums";
import { useCurrentUser } from "@/shared/contexts/AuthContext";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import {
  addMessageToSelectedChat,
  addSenderNameToGroupMessage,
  createMessageToDisplay,
  createMessageToSend,
  handleMessageSending,
  handleMessageSendingFailure,
} from "@/pages/Chat/utils";

export const useHiddenInputFile = () => {
  const chatActions = useChatActions();
  const selectedChat = useSelectedChat();
  const currentUser = useCurrentUser();
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

  const sendFileMessage = async (
    file: File,
    fileType: string
  ): Promise<void> => {
    if (!selectedChat) return;

    const messageToDisplayId: string = nanoid();

    try {
      const explicitFileType: string = fileType.split("/")[0];

      if (!validateFileMessage(explicitFileType, file)) return;

      const messageToSend: SendMessageValues = createMessageToSend(
        currentUser.user.id,
        selectedChat.id,
        MessageType[explicitFileType.toUpperCase() as keyof typeof MessageType],
        file
      );

      addSenderNameToGroupMessage(
        messageToSend,
        selectedChat,
        currentUser.user.username
      );

      const messageToDisplay: Message = await createMessageToDisplay(
        messageToSend,
        messageToDisplayId,
        currentUser.user,
        file
      );

      addMessageToSelectedChat(messageToDisplay, chatActions.setSelectedChat);

      await handleMessageSending(
        messageToSend,
        currentUser.user.username,
        `${explicitFileType} sent.`,
        chatActions.setRooms
      );
    } catch (error) {
      handleMessageSendingFailure(
        messageToDisplayId,
        chatActions.setSelectedChat
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
