import { Room } from "@/shared/interfaces";

export interface ChatSidebarListProps {
  chatSidebarListValues: ChatSidebarListValues;
  chatSidebarListActions: ChatSidebarListActions;
}

interface ChatSidebarListValues {
  loading: boolean;
  filteredRooms: Room[];
  dialogOpened: boolean;
  displayNoChats: boolean;
  displayNotFound: boolean;
  displayChats: boolean;
}

interface ChatSidebarListActions {
  openDialog: () => void;
  closeDialog: () => void;
}
