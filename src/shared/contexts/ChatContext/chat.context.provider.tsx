import { ReactNode, useEffect, useState } from "react";
import { ChatContext } from "./chat.context";
import { Room } from "@/shared/interfaces";
import { updateUserLastCheckedTime } from "@/shared/services";
import { useAuthContext } from "../AuthContext/auth.context.hook";

export const ChatContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { auth } = useAuthContext();
  const [selectedChat, setSelectedChat] = useState<Room | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [textMsgToSend, setTextMsgToSend] = useState<string>("");
  const userId: string = auth.user!.id;

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

  const handleRoomSelection = (room: Room): void => {
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
  };

  const handleArrowBack = (): void => {
    try {
      updateUserLastCheckedTime({
        roomId: selectedChat!.id,
        userId,
      });
      setSelectedChat(null);
      setTextMsgToSend("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chatContextValues: { selectedChat, rooms, textMsgToSend },
        chatContextActions: {
          handleRoomSelection,
          handleArrowBack,
          setSelectedChat,
          setRooms,
          setTextMsgToSend,
        },
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
