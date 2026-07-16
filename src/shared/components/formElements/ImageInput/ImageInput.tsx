import defaultAvatar from "@/assets/images/defaultAvatar.jpg";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { imageInputStyles } from "./imageInputStyles";
import { useImageInput } from "./useImageInput";
import { ImageInputProps } from "./ImageInputProps";
import { AcceptedFileTypes } from "@/shared/enums";

export const ImageInput: React.FC<ImageInputProps> = ({
  name,
  label,
  variant,
}) => {
  const formik = useFormikContext();
  const { imageInputValues, imageInputActions } = useImageInput(formik, name);

  return (
    <Box sx={imageInputStyles.container}>
      <Box component="label" htmlFor="inputImage" sx={imageInputStyles.label}>
        <Box
          component="img"
          alt={label}
          src={imageInputValues.avatar || defaultAvatar}
          sx={imageInputStyles.imgContainer}
        />
      </Box>
      <input
        id="inputImage"
        type="file"
        name={name}
        ref={imageInputValues.inputRef}
        accept={AcceptedFileTypes.Image}
        style={{ display: "none" }}
        onBlur={formik.getFieldProps(name).onBlur}
        onChange={imageInputActions.onFileInputChange}
      />
      <Box
        onClick={imageInputActions.openFileInput}
        sx={imageInputStyles.inputContainer}
      >
        <TextField
          value={imageInputValues.avatarName}
          variant={variant}
          disabled
          fullWidth
          label={label}
          error={
            formik.getFieldMeta(name).touched &&
            !!formik.getFieldMeta(name).error
          }
          helperText={
            formik.getFieldMeta(name).touched && formik.getFieldMeta(name).error
          }
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <AddAPhotoIcon sx={imageInputStyles.icon} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
};
