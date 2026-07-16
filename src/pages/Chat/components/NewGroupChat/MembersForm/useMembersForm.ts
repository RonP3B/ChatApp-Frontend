import * as Yup from "yup";
import { useUserSearch } from "@/pages/Chat/hooks";
import { User } from "@/shared/types";
import { FormikProps } from "formik";
import { Dispatch, SetStateAction } from "react";

export const useMembersForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  setGroupMembers: Dispatch<SetStateAction<User[]>>,
  groupMembers: User[]
) => {
  const { userSearchValues, userSearchActions } = useUserSearch();
  const initialValues: { members: User[] } = { members: groupMembers };

  const validationSchema = Yup.object({
    members: Yup.array()
      .min(2, "At least two participants are required.")
      .required("Participants required."),
  });

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

  const onSubmit = (): void => setActiveStep(1);

  return {
    membersFormValues: { ...userSearchValues, initialValues, validationSchema },
    membersFormActions: {
      ...userSearchActions,
      handleUserAddition,
      removeSelectedUser,
      onSubmit,
    },
  };
};
