import { createRoom, getUsers } from "@/pages/Chat/services";
import { useCurrentUser } from "@/shared/contexts/AuthContext";
import { useChatActions } from "@/shared/contexts/ChatContext";
import { useDebaounce, useToast } from "@/shared/hooks";
import { Room, User } from "@/shared/interfaces";
import { buildGenericErrorMessage } from "@/shared/utils";
import axios, { AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export const useNewChat = (handleClose: () => void) => {
  const chatActions = useChatActions();
  const currentUser = useCurrentUser();
  const toast = useToast();
  const toastRef = useRef(toast);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const debouncedUsernameFilter = useDebaounce(usernameFilter);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
  const loggedUserId: string = currentUser.user.id;

  useEffect(() => {
    toastRef.current = toast;
  }, [toast]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchUsers = async (): Promise<void> => {
      try {
        setLoading(true);
        const res: AxiosResponse = await getUsers(
          debouncedUsernameFilter,
          controller.signal
        );
        const data: User[] = res.data;
        const filteredUsers = data.filter((user) => user.id !== loggedUserId);
        setUsers(filteredUsers);
        setDisplayNotFound(filteredUsers.length === 0);
      } catch (error) {
        if (axios.isCancel(error)) return;
        toastRef.current(buildGenericErrorMessage("get users"), {
          type: "error",
        });
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

    return () => controller.abort();
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
      chatActions.setRooms((prev) => [newChatRoom, ...prev]);
      chatActions.setSelectedChat(newChatRoom);
      handleClose();
    } catch (error) {
      toast(buildGenericErrorMessage("create the chat room"), {
        type: "error",
      });
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
