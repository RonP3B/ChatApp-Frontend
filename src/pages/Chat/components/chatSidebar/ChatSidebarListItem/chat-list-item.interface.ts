import { Room } from "@/shared/interfaces";

export interface ChatListItemProps {
  isLoading: boolean;
  room: Room | undefined;
}
