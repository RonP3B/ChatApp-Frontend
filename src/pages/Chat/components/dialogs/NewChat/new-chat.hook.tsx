import { createRoom } from "@/pages/Chat/services";
import { useChatActions } from "@/shared/contexts/ChatContext";
import { useUserSearch } from "@/pages/Chat/hooks";
import { useToast } from "@/shared/hooks";
import { Room, User } from "@/shared/interfaces";
import { getAxiosErrorMessage } from "@/shared/utils";
import { AxiosResponse } from "axios";
import { useState } from "react";

export const useNewChat = (handleClose: () => void) => {
  const chatActions = useChatActions();
  const toast = useToast();
  const { userSearchValues, userSearchActions } = useUserSearch();
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const handleUserSelection = (user: User): void => {
    setSelectedUser(user);
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      setLoadingSubmit(true);
      const res: AxiosResponse = await createRoom({
        participantId: selectedUser!.id,
      });
      const newChatRoom: Room = res.data;
      chatActions.setRooms((prev) => [newChatRoom, ...prev]);
      chatActions.setSelectedChat(newChatRoom);
      handleClose();
    } catch (error) {
      toast(getAxiosErrorMessage(error), { type: "error" });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return {
    newChatValues: { ...userSearchValues, selectedUser, loadingSubmit },
    newChatActions: { ...userSearchActions, handleUserSelection, handleSubmit },
  };
};
