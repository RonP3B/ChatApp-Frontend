import { Room } from "@/shared/types";

export type ChatSidebarListItemProps =
  | {
      isLoading: true;
      room?: undefined;
    }
  | {
      isLoading: false;
      room: Room;
    };
