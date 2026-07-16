import { Theme, alpha } from "@mui/material/styles";

export const userActivationStyles = {
  container: {
    padding: 2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  paperContainer: {
    backgroundColor: (theme: Theme) => alpha(theme.palette.secondary.main, 0.9),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 4,
    boxShadow: 15,
  },
};
