import { Box } from "@mui/material";
import { badgeStyles } from "./badgeStyles";
import { BadgeProps } from "./BadgeProps";

export const Badge = ({ badgeContent }: BadgeProps) => {
  return (
    <Box component="span" sx={badgeStyles.badge}>
      <Box component="span">{badgeContent > 99 ? "+99" : badgeContent}</Box>
    </Box>
  );
};
