import { Box } from "@mui/material";
import { ScrollBarProps } from "./ScrollBarProps";
import {
  scrollBarStyles,
  StyledRootScrollbar,
  StyledScrollbar,
} from "./scrollBarStyles";

export const ScrollBar = ({
  children,
  customRef,
  sx,
  ...props
}: ScrollBarProps) => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box
        sx={{ ...scrollBarStyles.mobileContainer, ...sx }}
        ref={customRef}
        {...props}
      >
        <Box>{children}</Box>
      </Box>
    );
  }

  return (
    <StyledRootScrollbar sx={sx}>
      <StyledScrollbar
        clickOnTrack={false}
        scrollableNodeProps={{ ref: customRef }}
        {...props}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
};
