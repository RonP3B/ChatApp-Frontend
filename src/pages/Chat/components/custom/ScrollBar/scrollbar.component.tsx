import { Box } from "@mui/material";
import { ScrollBarProps } from "./scrollbar.interface";
import { StyledRootScrollbar, StyledScrollbar } from "./scrollbar.styles";

export const ScrollBar: React.FC<ScrollBarProps> = ({
  children,
  customRef,
  sx,
  ...props
}) => {
  const userAgent =
    typeof navigator === "undefined" ? "SSR" : navigator.userAgent;

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgent
    );

  if (isMobile) {
    return (
      <Box
        sx={{
          direction: "inherit",
          boxSizing: "border-box",
          position: "relative",
          display: "block",
          height: "100%",
          width: "auto",
          maxWidth: "100%",
          maxHeight: "100%",
          overflow: "auto",
          ...sx,
        }}
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
