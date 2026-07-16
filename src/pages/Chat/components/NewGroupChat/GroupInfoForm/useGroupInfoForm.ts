import * as Yup from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { Room, User } from "@/shared/types";
import { AxiosResponse } from "axios";
import { createGroupRoom } from "@/pages/Chat/services";
import { CreateGroupRoomValues } from "@/pages/Chat/types";
import { useToast } from "@/shared/hooks";
import { useChatActions } from "@/shared/contexts/ChatContext";
import { getAxiosErrorMessage } from "@/shared/utils";

export const useGroupInfoForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  handleClose: () => void,
  groupMembers: User[]
) => {
  const chatActions = useChatActions();
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
      chatActions.setSelectedChat(newGroupChatRoom);
      chatActions.setRooms((prev) => [newGroupChatRoom, ...prev]);
      handleClose();
      setActiveStep(0);
    } catch (error) {
      toast(getAxiosErrorMessage(error), { type: "error" });
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
