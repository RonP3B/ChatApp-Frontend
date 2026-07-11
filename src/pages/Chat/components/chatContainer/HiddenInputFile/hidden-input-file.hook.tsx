import { ChangeEvent } from "react";
import { SendMessageValues } from "@/pages/Chat/interfaces";
import { useToast } from "@/shared/hooks";
import { Message } from "@/shared/interfaces";
import { nanoid } from "nanoid";
import { MessageType } from "@/shared/enums";
import { useCurrentUser } from "@/shared/contexts/AuthContext";
import { useChatActions, useSelectedChat } from "@/shared/contexts/ChatContext";
import {
  addMessageToSelectedChat,
  addSenderNameToGroupMessage,
  createMessageToDisplay,
  createMessageToSend,
  handleMessageSending,
  handleMessageSendingFailure,
  validateFileMessage,
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

      if (!validateFileMessage(explicitFileType, file, toast)) return;

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

  return { handleOnChangeInput };
};
