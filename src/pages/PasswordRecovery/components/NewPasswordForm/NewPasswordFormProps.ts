import { Dispatch, SetStateAction } from "react";

export interface NewPasswordFormProps {
  setActiveStep: Dispatch<SetStateAction<number>>;
  username: string;
}
