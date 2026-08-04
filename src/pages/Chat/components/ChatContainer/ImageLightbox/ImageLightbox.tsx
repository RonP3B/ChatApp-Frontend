import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ImageLightboxProps } from "./ImageLightboxProps";
import { imageLightboxStyles } from "./imageLightboxStyles";

export const ImageLightbox = ({ src, isOpen, onClose }: ImageLightboxProps) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={imageLightboxStyles.container}>
        <Box
          component="img"
          src={src}
          alt="Enlarged message image"
          sx={imageLightboxStyles.image}
        />
        <IconButton onClick={onClose} sx={imageLightboxStyles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  );
};
