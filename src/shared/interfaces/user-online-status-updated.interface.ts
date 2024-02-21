export interface UserOnlineStatusUpdated {
  id: string;
  isOnline: boolean;
  rooms: { id: string }[];
}
