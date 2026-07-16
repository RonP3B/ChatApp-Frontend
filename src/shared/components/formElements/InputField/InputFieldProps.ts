import { TextFieldVariants } from "@mui/material/TextField";

export interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  multiline?: boolean;
  disabled?: boolean;
  variant?: TextFieldVariants;
  margin?: "none" | "normal" | "dense";
  sx?: object;
  InputProps?: object;
  autoComplete?: string;
}
