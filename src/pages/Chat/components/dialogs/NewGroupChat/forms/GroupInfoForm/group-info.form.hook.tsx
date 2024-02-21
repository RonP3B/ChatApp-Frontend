import * as Yup from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { Room, User } from "@/shared/interfaces";
import { AxiosResponse } from "axios";
import { createGroupRoom } from "@/pages/Chat/services";
import { CreateGroupRoomValues } from "@/pages/Chat/interfaces";
import { useChatContext } from "@/shared/contexts";
import { getAxiosErrorMsg } from "@/shared/utils";
import { useToast } from "@/shared/hooks";

export const useGroupInfoForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  handleClose: () => void,
  groupMembers: User[]
) => {
  const { chatContextActions } = useChatContext();
  const toast = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    groupImage: null,
    groupName: "",
  };

  const validationSchema = Yup.object({
    groupImage: Yup.mixed().required("Group image required"),
    groupName: Yup.string()
      .trim()
      .required("Group name required")
      .min(3, "Group name must have at least 5 characters")
      .max(15, "Group name must have at most 20 characters"),
  });

  const onSubmit = async (values: {
    groupImage: Blob | null;
    groupName: string;
  }): Promise<void> => {
    try {
      setLoading(true);
      const newGroupRoom: CreateGroupRoomValues = {
        participantIds: groupMembers.map((user) => user.id),
        ...values,
      };
      const res: AxiosResponse = await createGroupRoom(newGroupRoom);
      const newGroupChatRoom: Room = res.data;
      chatContextActions.setSelectedChat(newGroupChatRoom);
      chatContextActions.setRooms((prev) => [newGroupChatRoom, ...prev]);
      handleClose();
      setActiveStep(0);
    } catch (error) {
      const errorMsg: string = getAxiosErrorMsg(error, "create the group");
      toast(errorMsg, { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const goPreviousStep = (): void => {
    setActiveStep(0);
  };

  return {
    groupInfoFormValues: { loading, initialValues, validationSchema },
    groupInfoFormActions: { goPreviousStep, onSubmit },
  };
};
