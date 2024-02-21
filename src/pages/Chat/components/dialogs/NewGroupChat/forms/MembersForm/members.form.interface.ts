import { User } from "@/shared/interfaces";
import { Dispatch, SetStateAction } from "react";

export interface MembersFormProps {
  handleClose: () => void;
  setActiveStep: Dispatch<SetStateAction<number>>;
  setGroupMembers: Dispatch<SetStateAction<User[]>>;
  groupMembers: User[];
}
