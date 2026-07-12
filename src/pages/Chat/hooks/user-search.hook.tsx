import { ChangeEvent, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { getUsers } from "@/pages/Chat/services";
import { useDebaounce, useToast } from "@/shared/hooks";
import { User } from "@/shared/interfaces";
import { getAxiosErrorMessage } from "@/shared/utils";
import { useCurrentUser } from "@/shared/contexts/AuthContext";

export const useUserSearch = () => {
  const currentUser = useCurrentUser();
  const toast = useToast();
  const toastRef = useRef(toast);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const debouncedUsernameFilter = useDebaounce(usernameFilter);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
  const loggedUserId = currentUser.user.id;

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
        toastRef.current(getAxiosErrorMessage(error), { type: "error" });
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

  return {
    userSearchValues: {
      usernameFilter,
      debouncedUsernameFilter,
      users,
      loading,
      displayNotFound,
    },
    userSearchActions: { handleInputChange },
  };
};
