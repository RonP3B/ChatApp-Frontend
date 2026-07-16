import { ChangeEvent, MouseEvent } from "react";

export interface ChatSidebarHeaderProps {
  chatSidebarHeaderValues: ChatSidebarHeaderValues;
  chatSidebarHeaderActions: ChatSidebarHeaderActions;
}

interface ChatSidebarHeaderValues {
  filterChat: string;
  anchorEl: HTMLElement | null;
  open: boolean;
  menuItems: MenuItem[];
  isDarkModeActive: boolean;
  newChatDialogOpened: boolean;
  newGroupChatDialogOpened: boolean;
}

interface ChatSidebarHeaderActions {
  handleMenuClose: () => void;
  handleMenuClick: (event: MouseEvent<HTMLButtonElement>) => void;
  closeNewChatDialog: () => void;
  closeNewGroupChatDialog: () => void;
  handleChatFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  clearChatFilter: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  darkMode?: boolean;
}
