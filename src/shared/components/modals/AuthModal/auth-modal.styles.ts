import { Theme, alpha } from "@mui/material/styles";

export const AuthModalStyles = {
  container: {
    padding: 2,
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  gridContainer: {
    width: { xs: "90%", md: "85%" },
    maxWidth: 940,
    minHeight: 450,
    boxShadow: 15,
    borderRadius: 1,
  },

  logoGridItem: {
    backgroundColor: (theme: Theme) => alpha(theme.palette.primary.main, 0.8),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: { xs: 1, md: 2 },
  },

  contentGridItem: {
    backgroundColor: (theme: Theme) => alpha(theme.palette.secondary.main, 0.9),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 2,
  },

  logoImg: {
    height: { xs: 80, md: 120 },
    width: { xs: 80, md: 120 },
  },

  logoTitle: {
    fontSize: { xs: 30, md: 34 },
    fontFamily: "Rubik Distressed",
  },

  logoSubtitle: {
    fontWeight: "bold",
    textAlign: "center",
    mx: 2,
    mb: { xs: 0, md: 3 },
    fontSize: { xs: 12, md: "auto" },
  },
};
