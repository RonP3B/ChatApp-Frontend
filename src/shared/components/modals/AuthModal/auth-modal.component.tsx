import Logo from "@/assets/images/logo.png";
import { Box, Grid, Typography } from "@mui/material";
import { AuthModalStyles } from "./auth-modal.styles";

export const AuthModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box sx={AuthModalStyles.container}>
      <Grid container sx={AuthModalStyles.gridContainer}>
        <Grid item xs={12} md={4} sx={AuthModalStyles.logoGridItem}>
          <Box
            component="img"
            src={Logo}
            alt="ChatApp logo"
            sx={AuthModalStyles.logoImg}
          />
          <Typography
            variant="h4"
            color="secondary"
            sx={AuthModalStyles.logoTitle}
          >
            ChatApp
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            sx={AuthModalStyles.logoSubtitle}
          >
            Conversations That Echo, Connections That Last
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} sx={AuthModalStyles.contentGridItem}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
