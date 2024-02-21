import { Box } from "@mui/material";
import { badgeStyles } from "./badge.style";

export const Badge: React.FC<{ badgeContent: number }> = ({ badgeContent }) => {
  return (
    <Box component="span" sx={badgeStyles.badge}>
      <Box component="span">{badgeContent > 99 ? "+99" : badgeContent}</Box>
    </Box>
  );
};
