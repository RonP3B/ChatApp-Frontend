import { Theme } from "@mui/material/styles";

export const chatSidebarListItemStyles = {
  avatar: {
    border: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
    marginRight: 2,
  },

  circularSkeleton: {
    marginRight: 2,
  },

  listItemText: {
    width: "70vw",
  },

  listItemTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listItemSecondaryContainer: {
    display: "flex",
    justifyContent: "space-between",
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
