import { User } from "@/shared/interfaces";
import { useState } from "react";

export const useNewGroupChat = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [groupMembers, setGroupMembers] = useState<User[]>([]);

  return {
    newGroupChatValues: {
      activeStep,
      groupMembers,
    },

    newGroupChatActions: {
      setActiveStep,
      setGroupMembers,
    },
  };
};
