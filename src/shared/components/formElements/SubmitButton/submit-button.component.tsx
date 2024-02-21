import { Button, CircularProgress } from "@mui/material";
import { SubmitButtonProps } from "./submit-button.interface";

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  text,
  loadingText,
  variant,
  fullWidth,
  disabled = false,
  sx = {},
  onClick = undefined,
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      sx={{
        opacity: loading ? 0.5 : 1,
        ...(loading && { pointerEvents: "none" }),
        ...sx,
      }}
    >
      {loading && (
        <CircularProgress
          size={17}
          color="inherit"
          sx={{ marginRight: 0.55 }}
        />
      )}
      {loading ? loadingText : text}
    </Button>
  );
};
