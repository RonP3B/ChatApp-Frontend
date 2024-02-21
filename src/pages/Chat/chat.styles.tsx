import { useChatContext } from "@/shared/contexts";
import { Theme, alpha, useMediaQuery } from "@mui/material";

export const useChatStyles = () => {
  const isScreenBelow900px = useMediaQuery("(max-width:899px)");
  const { chatContextValues } = useChatContext();

  return {
    mainContainer: {
      width: "100%",
      height: "100vh",
    },

    sidebarGrid: {
      borderRight: isScreenBelow900px ? "none" : "1px solid",
      borderRightColor: (theme: Theme) => theme.palette.divider,
      display:
        isScreenBelow900px && chatContextValues.selectedChat ? "none" : "block",
      maxHeight: "100%",
      overflow: "hidden",
    },

    chatContainerGrid: {
      backgroundColor: (theme: Theme) =>
        alpha(theme.palette.primary.light, 0.1),
      display:
        isScreenBelow900px && !chatContextValues.selectedChat ? "none" : "flex",
      flexDirection: "column",
    },
  };
};
