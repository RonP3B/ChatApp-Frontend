import { Dispatch, SetStateAction } from "react";

export interface FindUserFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}
