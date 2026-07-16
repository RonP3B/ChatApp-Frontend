import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Room } from "@/shared/types";
import { updateUserLastCheckedTime } from "@/shared/services";
import { ChatContextActions } from "./ChatContextActions";
import { useCurrentUser } from "../AuthContext";
import {
  ChatActionsContext,
  ChatDraftContext,
  ChatRoomsContext,
  SelectedChatContext,
} from "./ChatContext";

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useCurrentUser();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [textMsgToSend, setTextMsgToSend] = useState<string>("");
  const userId: string = auth.user.id;

  useEffect(() => {
    const sentRef = { current: false };

    const sendLastChecked = (): void => {
      if (sentRef.current || !selectedChat) return;

      sentRef.current = true;

      updateUserLastCheckedTime({
        roomId: selectedChat.id,
        userId,
      }).catch(console.error);
    };

    const handleVisibilityChange = (): void => {
      if (document.visibilityState === "hidden") sendLastChecked();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", sendLastChecked);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", sendLastChecked);
    };
  }, [selectedChat, userId]);

  const handleRoomSelection = useCallback(
    (room: Room): void => {
      if (selectedChat) {
        setTextMsgToSend("");
        updateUserLastCheckedTime({
          roomId: selectedChat.id,
          userId,
        }).catch(console.error);
      }

      if (room.unreadMessages) {
        setRooms((prev) =>
          prev.map((currRoom) => {
            if (room.id !== currRoom.id) return currRoom;
            return { ...currRoom, unreadMessages: 0 };
          })
        );
      }

      setSelectedChat(room);
    },
    [selectedChat, userId]
  );

  const handleArrowBack = useCallback((): void => {
    if (!selectedChat) return;

    updateUserLastCheckedTime({
      roomId: selectedChat.id,
      userId,
    }).catch(console.error);

    setSelectedChat(null);
    setTextMsgToSend("");
  }, [selectedChat, userId]);

  const chatActions: ChatContextActions = useMemo(
    () => ({
      handleRoomSelection,
      handleArrowBack,
      setSelectedChat,
      setRooms,
      setTextMsgToSend,
    }),
    [handleArrowBack, handleRoomSelection]
  );

  return (
    <ChatRoomsContext.Provider value={rooms}>
      <SelectedChatContext.Provider value={selectedChat}>
        <ChatDraftContext.Provider value={textMsgToSend}>
          <ChatActionsContext.Provider value={chatActions}>
            {children}
          </ChatActionsContext.Provider>
        </ChatDraftContext.Provider>
      </SelectedChatContext.Provider>
    </ChatRoomsContext.Provider>
  );
};
