import { Theme } from "@mui/material/styles";

export const ChatListItemStyles = {
  avatar: {
    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
  },

  listItemText: {
    width: "70vw",
  },

  listItemTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listItemTextDate: {
    fontSize: "0.7rem",
  },

  textEllipsis: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
};
