import { useState, ChangeEvent, MouseEvent } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useDarkMode, useLogOutUser, useOpenDialog } from "@/shared/hooks";

export const useChatSidebarHeader = () => {
  const logOutUser = useLogOutUser();
  const { isDarkModeActive, toggleDarkMode } = useDarkMode();

  const {
    openDialog: openNewChatDialog,
    closeDialog: closeNewChatDialog,
    dialogOpened: newChatDialogOpened,
  } = useOpenDialog();

  const {
    openDialog: openNewGroupChatDialog,
    closeDialog: closeNewGroupChatDialog,
    dialogOpened: newGroupChatDialogOpened,
  } = useOpenDialog();

  const [filterChat, setFilterChat] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const clearChatFilter = (): void => {
    setFilterChat("");
  };

  const handleChatFilter = (event: ChangeEvent<HTMLInputElement>): void => {
    setFilterChat(event.target.value);
  };

  const handleMenuClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      icon: <AddCommentIcon />,
      text: "New Chat",
      onClick: () => {
        openNewChatDialog();
        handleMenuClose();
      },
    },
    {
      icon: <GroupAddIcon />,
      text: "New Group Chat",
      onClick: () => {
        openNewGroupChatDialog();
        handleMenuClose();
      },
    },
    {
      icon: <Brightness4Icon />,
      text: "Dark Mode",
      onClick: () => toggleDarkMode(),
      darkMode: true,
    },
    {
      icon: <LogoutIcon />,
      text: "Logout",
      onClick: async () => {
        handleMenuClose();
        await logOutUser();
      },
    },
  ];

  return {
    chatSidebarHeaderValues: {
      filterChat,
      anchorEl,
      open,
      menuItems,
      isDarkModeActive,
      newChatDialogOpened,
      newGroupChatDialogOpened,
    },

    chatSidebarHeaderActions: {
      handleMenuClose,
      handleMenuClick,
      closeNewChatDialog,
      closeNewGroupChatDialog,
      handleChatFilter,
      clearChatFilter,
    },
  };
};
