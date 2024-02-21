import { Theme } from "@mui/material";

export const ChatHeaderStyles = {
  container: {
    backgroundColor: "background.paper",
    boxShadow: (theme: Theme) => theme.shadows[1],
  },

  avatar: {
    mr: 1,
    width: 50,
    height: 50,
    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
  },

  userInfoContainer: {
    display: "flex",
    flexDirection: "column",
  },

  lineHeight: {
    lineHeight: "normal",
  },
};
