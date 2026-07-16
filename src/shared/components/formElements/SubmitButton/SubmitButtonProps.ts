export interface SubmitButtonProps {
  loading: boolean;
  text: string;
  loadingText: string;
  variant: "contained" | "outlined" | "text";
  fullWidth: boolean;
  disabled?: boolean;
  sx?: object;
  onClick?: () => void;
}
