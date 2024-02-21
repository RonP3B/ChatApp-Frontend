import { PopoverOrigin } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { AcceptedFileTypes, MessageType } from "@/shared/enums";
import { useAuthContext, useChatContext } from "@/shared/contexts";
import { SendMessageValues } from "@/pages/Chat/interfaces";
import { Message, User } from "@/shared/interfaces";
import { nanoid } from "nanoid";
import {
  addMessageToSelectedChat,
  createMessageToDisplay,
  createMessageToSend,
  handleMessageSending,
  handleMessageSendingFailure,
} from "@/pages/Chat/utils";
import {
  useState,
  useRef,
  MouseEvent,
  MutableRefObject,
  ChangeEvent,
  useEffect,
} from "react";

export const useChatFooter = () => {
  const { auth } = useAuthContext();
  const { chatContextValues, chatContextActions } = useChatContext();
  const [msgToSend, setMsgToSend] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => setMsgToSend(""), [chatContextValues.selectedChat]);

  const open: boolean = Boolean(anchorEl);
  const disableButton: boolean = !msgToSend.trim();

  const fileInputRefs: {
    [key: string]: MutableRefObject<HTMLInputElement | null>;
  } = {
    Image: useRef<HTMLInputElement>(null),
    Video: useRef<HTMLInputElement>(null),
    Audio: useRef<HTMLInputElement>(null),
  };

  const menuItems: { text: string; icon: JSX.Element }[] = [
    { text: "Image", icon: <ImageIcon /> },
    { text: "Video", icon: <CameraRollIcon /> },
    { text: "Audio", icon: <AudiotrackIcon /> },
  ];

  const fileInputs: {
    customRef: MutableRefObject<HTMLInputElement | null>;
    fileType: AcceptedFileTypes;
  }[] = [
    { customRef: fileInputRefs.Image, fileType: AcceptedFileTypes.Image },
    { customRef: fileInputRefs.Video, fileType: AcceptedFileTypes.Video },
    { customRef: fileInputRefs.Audio, fileType: AcceptedFileTypes.Audio },
  ];

  const menuOrigin: {
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
  } = {
    anchorOrigin: { vertical: "top", horizontal: "right" },
    transformOrigin: { vertical: "bottom", horizontal: "right" },
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMsgToSend(event.target.value);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleFileInputClick = (fileType: string): void => {
    const ref = fileInputRefs[fileType];
    ref.current?.click();
    handleClose();
  };

  const addSenderNameToGroupMessage = (
    messageToSend: SendMessageValues
  ): void => {
    if (chatContextValues.selectedChat!.isGroup) {
      messageToSend["senderName"] = auth.user!.username;
    }
  };

  const sendTextMessage = async (): Promise<void> => {
    const messageToDisplayId: string = nanoid();

    try {
      const messageToSend: SendMessageValues = createMessageToSend(
        auth.user!.id,
        chatContextValues.selectedChat!.id,
        MessageType.TEXT,
        msgToSend.trim()
      );

      addSenderNameToGroupMessage(messageToSend);

      const messageToDisplay: Message = await createMessageToDisplay(
        messageToSend,
        messageToDisplayId,
        auth.user as User
      );

      addMessageToSelectedChat(
        messageToDisplay,
        chatContextActions.setSelectedChat
      );

      setMsgToSend("");

      await handleMessageSending(
        messageToSend,
        auth.user!.username,
        messageToSend.content as string,
        chatContextActions.setRooms
      );
    } catch (error) {
      handleMessageSendingFailure(
        messageToDisplayId,
        chatContextActions.setSelectedChat
      );
    }
  };

  return {
    chatFooterValues: {
      msgToSend,
      anchorEl,
      open,
      fileInputRefs,
      fileInputs,
      menuOrigin,
      menuItems,
      disableButton,
    },

    chatFooterActions: {
      handleInputChange,
      handleClick,
      handleClose,
      handleFileInputClick,
      sendTextMessage,
    },
  };
};
