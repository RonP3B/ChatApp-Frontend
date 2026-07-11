import { PopoverOrigin } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CameraRollIcon from "@mui/icons-material/CameraRoll";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";

export const MENU_ITEMS: { text: string; icon: JSX.Element }[] = [
  { text: "Image", icon: <ImageIcon /> },
  { text: "Video", icon: <CameraRollIcon /> },
  { text: "Audio", icon: <AudiotrackIcon /> },
];

export const MENU_ORIGIN: {
  anchorOrigin: PopoverOrigin;
  transformOrigin: PopoverOrigin;
} = {
  anchorOrigin: { vertical: "top", horizontal: "right" },
  transformOrigin: { vertical: "bottom", horizontal: "right" },
};
