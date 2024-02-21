import { createRoom, getUsers } from "@/pages/Chat/services";
import { useAuthContext, useChatContext } from "@/shared/contexts";
import { useDebaounce, useToast } from "@/shared/hooks";
import { Room, User } from "@/shared/interfaces";
import { getAxiosErrorMsg } from "@/shared/utils";
import { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useNewChat = (handleClose: () => void) => {
  const { chatContextActions } = useChatContext();
  const { auth } = useAuthContext();
  const toast = useToast();
  const toastRef = useRef(toast);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const debouncedUsernameFilter = useDebaounce(usernameFilter);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
  const loggedUserId: string = auth.user!.id;

  useEffect(() => {
    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const res: AxiosResponse = await getUsers(debouncedUsernameFilter);
        const data: User[] = res.data;
        setUsers(data.filter((user) => user.id !== loggedUserId));
        setDisplayNotFound(data.length === 0);
      } catch (error) {
        const errorMsg: string = getAxiosErrorMsg(error, "get users");
        toastRef.current(errorMsg, { type: "error" });
      } finally {
        setLoading(false);
      }
    };

    if (debouncedUsernameFilter) {
      fetchUsers();
    } else {
      setUsers([]);
      setDisplayNotFound(false);
    }

    setSelectedUser(undefined);
  }, [debouncedUsernameFilter, loggedUserId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsernameFilter(event.target.value);
  };

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
      chatContextActions.setRooms((prev) => [newChatRoom, ...prev]);
      chatContextActions.setSelectedChat(newChatRoom);
      handleClose();
    } catch (error) {
      const errorMsg: string = getAxiosErrorMsg(error, "create the chat room");
      toast(errorMsg, { type: "error" });
    } finally {
      setLoadingSubmit(false);
    }
  };

  return {
    newChatValues: {
      usernameFilter,
      debouncedUsernameFilter,
      loading,
      users,
      selectedUser,
      loadingSubmit,
      displayNotFound,
    },

    newChatActions: {
      handleInputChange,
      handleUserSelection,
      handleSubmit,
    },
  };
};
