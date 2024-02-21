import * as Yup from "yup";
import { useDebaounce, useToast } from "@/shared/hooks";
import { User } from "@/shared/interfaces";
import { getUsers } from "@/pages/Chat/services";
import { useAuthContext } from "@/shared/contexts";
import { getAxiosErrorMsg } from "@/shared/utils";
import { AxiosResponse } from "axios";
import { FormikProps } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export const useMembersForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  setGroupMembers: Dispatch<SetStateAction<User[]>>,
  groupMembers: User[]
) => {
  const { auth } = useAuthContext();
  const toast = useToast();
  const toastRef = useRef(toast);
  const [usernameFilter, setUsernameFilter] = useState<string>("");
  const debouncedUsernameFilter = useDebaounce(usernameFilter);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [displayNotFound, setDisplayNotFound] = useState<boolean>(false);
  const loggedUserId: string = auth.user!.id;
  const initialValues: { members: User[] } = { members: groupMembers };

  const validationSchema = Yup.object({
    members: Yup.array()
      .min(2, "At least two participants are required.")
      .required("Participants required."),
  });

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
  }, [debouncedUsernameFilter, loggedUserId]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setUsernameFilter(event.target.value);
  };

  const handleUserAddition = (
    user: User,
    formik: FormikProps<{ members: User[] }>
  ): void => {
    const updatedMembers = groupMembers.filter(
      (member) => member.id !== user.id
    );

    if (updatedMembers.length === groupMembers.length) {
      updatedMembers.push(user);
    }

    formik.setFieldValue("members", updatedMembers);
    setGroupMembers(updatedMembers);
  };

  const removeSelectedUser = (
    id: string,
    formik: FormikProps<{ members: User[] }>
  ): void => {
    const updatedMembers = groupMembers.filter((member) => member.id !== id);
    formik.setFieldValue("members", updatedMembers);
    setGroupMembers(updatedMembers);
  };

  const onSubmit = (): void => {
    setActiveStep(1);
  };

  return {
    membersFormValues: {
      users,
      loading,
      usernameFilter,
      initialValues,
      validationSchema,
      displayNotFound,
      debouncedUsernameFilter,
    },

    membersFormActions: {
      handleInputChange,
      handleUserAddition,
      removeSelectedUser,
      onSubmit,
    },
  };
};
