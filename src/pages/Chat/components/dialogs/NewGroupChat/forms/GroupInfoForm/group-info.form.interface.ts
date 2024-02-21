import { User } from "@/shared/interfaces";
import { Dispatch, SetStateAction } from "react";

export interface GroupInfoFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  handleClose: () => void;
  groupMembers: User[];
}
