import { Room } from "@/shared/interfaces";

export type ChatListItemProps =
  | {
      isLoading: true;
      room?: undefined;
    }
  | {
      isLoading: false;
      room: Room;
    };
