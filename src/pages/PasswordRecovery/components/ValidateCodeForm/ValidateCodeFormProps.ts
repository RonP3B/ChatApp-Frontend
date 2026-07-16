import { Dispatch, SetStateAction } from "react";

export interface ValidateCodeFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  username: string;
}
