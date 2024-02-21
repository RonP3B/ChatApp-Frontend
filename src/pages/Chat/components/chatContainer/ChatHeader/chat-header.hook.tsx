import { useAuthContext, useChatContext } from "@/shared/contexts";
import { User } from "@/shared/interfaces";
import { useMediaQuery } from "@mui/material";

export const useChatHeader = () => {
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");
  const { chatContextValues } = useChatContext();
  const { auth } = useAuthContext();

  const loggedUserId: string = auth.user!.id;

  const selectedChat = chatContextValues.selectedChat || {
    isGroup: false,
    participants: [],
  };

  const { isGroup, participants } = selectedChat;
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
