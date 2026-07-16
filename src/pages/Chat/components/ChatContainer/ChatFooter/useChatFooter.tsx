import ImageIcon from "@mui/icons-material/Image";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { AcceptedFileTypes, MessageType } from "@/shared/enums";
import { Message } from "@/shared/types";
import { useCurrentUser } from "@/shared/contexts/AuthContext";
import { SendMessageValues } from "@/pages/Chat/types";
import { nanoid } from "nanoid";
import {
  useState,
  useRef,
  MouseEvent,
  MutableRefObject,
  ChangeEvent,
} from "react";
import {
  addMessageToSelectedChat,
  addSenderNameToGroupMessage,
  createMessageToDisplay,
  createMessageToSend,
  handleMessageSending,
  handleMessageSendingFailure,
} from "@/pages/Chat/utils";
import {
  useSelectedChat,
  useChatDraft,
  useChatActions,
} from "@/shared/contexts/ChatContext";

export const useChatFooter = () => {
  const currentUser = useCurrentUser();
  const selectedChat = useSelectedChat();
  const textMsgToSend = useChatDraft();
  const chatActions = useChatActions();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open: boolean = Boolean(anchorEl);
  const disableButton: boolean = !textMsgToSend.trim();

  const fileInputRefs: {
    [key: string]: MutableRefObject<HTMLInputElement | null>;
  } = {
    Image: useRef<HTMLInputElement>(null),
    Video: useRef<HTMLInputElement>(null),
    Audio: useRef<HTMLInputElement>(null),
  };

  const fileInputs: {
    customRef: MutableRefObject<HTMLInputElement | null>;
    fileType: AcceptedFileTypes;
  }[] = [
    { customRef: fileInputRefs.Image, fileType: AcceptedFileTypes.Image },
    { customRef: fileInputRefs.Video, fileType: AcceptedFileTypes.Video },
    { customRef: fileInputRefs.Audio, fileType: AcceptedFileTypes.Audio },
  ];

  const menuItems: { text: string; icon: JSX.Element }[] = [
    { text: "Image", icon: <ImageIcon /> },
    { text: "Video", icon: <CameraRollIcon /> },
    { text: "Audio", icon: <AudiotrackIcon /> },
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    chatActions.setTextMsgToSend(event.target.value);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const handleFileInputClick = (fileType: string): void => {
    fileInputRefs[fileType].current?.click();
    handleClose();
  };

  const sendTextMessage = async (): Promise<void> => {
    if (!selectedChat) return;

    const messageToDisplayId: string = nanoid();

    try {
      const messageToSend: SendMessageValues = createMessageToSend(
        currentUser.user.id,
        selectedChat.id,
        MessageType.TEXT,
        textMsgToSend.trim()
      );

      addSenderNameToGroupMessage(
        messageToSend,
        selectedChat,
        currentUser.user.username
      );

      const messageToDisplay: Message = await createMessageToDisplay(
        messageToSend,
        messageToDisplayId,
        currentUser.user
      );

      addMessageToSelectedChat(messageToDisplay, chatActions.setSelectedChat);
      chatActions.setTextMsgToSend("");

      await handleMessageSending(
        messageToSend,
        currentUser.user.username,
        messageToSend.content as string,
        chatActions.setRooms
      );
    } catch (error) {
      handleMessageSendingFailure(
        messageToDisplayId,
        chatActions.setSelectedChat
      );
    }
  };

  return {
    chatFooterValues: {
      textMsgToSend,
      anchorEl,
      open,
      fileInputRefs,
      fileInputs,
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
