import { useField } from "formik";
import TextField from "@mui/material/TextField";
import { InputFieldProps } from "./input-field.interface";

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  sx = {},
  InputProps = {},
  type = "text",
  multiline = false,
  variant = "outlined",
  margin = "none",
  disabled = false,
  autoComplete = "off",
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      {...field}
      sx={sx}
      type={type}
      name={name}
      label={label}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      variant={variant}
      margin={margin}
      multiline={multiline}
      rows={multiline ? 4 : undefined}
      InputProps={InputProps}
      disabled={disabled}
      autoComplete={autoComplete}
      fullWidth
    />
  );
};
