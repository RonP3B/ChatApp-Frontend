import { useParams } from "react-router";
import { useUserActivation } from "./useUserActivation";
import { CenteredLoading } from "@/shared/components";
import { Button, Container, Paper, Typography } from "@mui/material";
import { authStyles } from "@/shared/styles";
import { Link as RouterLink } from "react-router";
import { userActivationStyles } from "./userActivationStyles";

export const UserActivationPage: React.FC = () => {
  const { username } = useParams();
  const { loading } = useUserActivation(username || "");

  if (loading) {
    return <CenteredLoading />;
  }

  return (
    <Container maxWidth="sm" sx={userActivationStyles.container}>
      <Paper sx={userActivationStyles.paperContainer}>
        <Typography variant="h4" color="primary" sx={authStyles.title}>
          Activation Successful
        </Typography>
        <Typography variant="body1">
          Congratulations <strong>{username}</strong>! Your ChatApp account has
          been successfully activated. You are now part of our vibrant
          community.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1.5, mb: 0.5 }}>
          Feel free to explore and connect with other members. If you have any
          questions or need assistance, our support team is here to help.
        </Typography>
        <Button
          fullWidth
          variant="contained"
          sx={authStyles.primaryBtn}
          component={RouterLink}
          to="/sign-in"
        >
          Sign In Now
        </Button>
      </Paper>
    </Container>
  );
};
