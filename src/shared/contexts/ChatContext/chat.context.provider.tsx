import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Room } from "@/shared/interfaces";
import { updateUserLastCheckedTime } from "@/shared/services";
import { ChatContextActions } from "./chat.context.interface";
import { useCurrentUser } from "../AuthContext";
import {
  ChatActionsContext,
  ChatDraftContext,
  ChatRoomsContext,
  SelectedChatContext,
} from "./chat.context";

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useCurrentUser();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [textMsgToSend, setTextMsgToSend] = useState<string>("");
  const userId: string = auth.user.id;

  useEffect(() => {
    const handleBeforeUnload = async (): Promise<void> => {
      try {
        if (!selectedChat) return;
        await updateUserLastCheckedTime({
          roomId: selectedChat.id,
          userId,
        });
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [selectedChat, userId]);

  const handleRoomSelection = useCallback(
    (room: Room): void => {
      try {
        if (selectedChat) {
          setTextMsgToSend("");
          updateUserLastCheckedTime({
            roomId: selectedChat.id,
            userId,
          });
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
      } catch (error) {
        console.error(error);
      }
    },
    [selectedChat, userId]
  );

  const handleArrowBack = useCallback((): void => {
    try {
      if (!selectedChat) return;
      updateUserLastCheckedTime({
        roomId: selectedChat.id,
        userId,
      });
      setSelectedChat(null);
      setTextMsgToSend("");
    } catch (error) {
      console.error(error);
    }
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
