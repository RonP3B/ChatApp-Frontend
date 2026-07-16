import Logo from "@/assets/images/logo.png";
import { Box, Grid, Typography } from "@mui/material";
import { authModalStyles } from "./authModalStyles";

export const AuthModal: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Box sx={authModalStyles.container}>
      <Grid container sx={authModalStyles.gridContainer}>
        <Grid size={{ xs: 12, md: 4 }} sx={authModalStyles.logoGridItem}>
          <Box
            component="img"
            src={Logo}
            alt="ChatApp logo"
            sx={authModalStyles.logoImg}
          />
          <Typography
            variant="h4"
            color="secondary"
            sx={authModalStyles.logoTitle}
          >
            ChatApp
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            sx={authModalStyles.logoSubtitle}
          >
            Conversations That Echo, Connections That Last
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }} sx={authModalStyles.contentGridItem}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
};
