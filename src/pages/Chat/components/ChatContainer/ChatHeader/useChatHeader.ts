import { useCurrentUser } from "@/shared/contexts/AuthContext";
import { Room, User } from "@/shared/types";
import { useMediaQuery } from "@mui/material";

export const useChatHeader = (selectedChat: Room | null) => {
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");
  const currentUser = useCurrentUser();
  const loggedUserId: string = currentUser.user.id;

  const chat = selectedChat || {
    isGroup: false,
    participants: [],
  };

  const { isGroup, participants } = chat;
  let onlineStatus: string = "";
  let onlineStatusColor: string | undefined = undefined;

  if (!isGroup) {
    const participant: User | undefined = participants.find(
      (p) => p.id !== loggedUserId
    );
    onlineStatus = participant?.isOnline ? "online" : "offline";
    onlineStatusColor = participant?.isOnline ? "primary.main" : undefined;
  } else {
    const onlineCount: number = participants.filter((p) => p.isOnline).length;
    const participantsLength: number = participants.length;
    onlineStatus = `${participantsLength} members, ${onlineCount} online`;
  }

  return {
    chatHeaderValues: { isScreenBelow900px, onlineStatus, onlineStatusColor },
  };
};
