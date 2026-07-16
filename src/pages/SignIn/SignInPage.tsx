import { Link as RouterLink } from "react-router";
import { Formik, Form } from "formik";
import { useSignIn } from "./useSignIn";
import { Box, Typography, Button, Link, Divider } from "@mui/material";
import { AuthModal, InputField, SubmitButton } from "@/shared/components";
import { authStyles } from "@/shared/styles";
import { signInStyles } from "./signInStyles";

export const SignInPage: React.FC = () => {
  const { signInValues, signInActions } = useSignIn();

  return (
    <AuthModal>
      <Typography variant="h4" color="primary" sx={authStyles.title}>
        Sign In
      </Typography>
      <Formik
        initialValues={signInValues.initialValues}
        validationSchema={signInValues.validationSchema}
        onSubmit={signInActions.onSubmit}
      >
        {() => (
          <Form>
            <InputField
              label="Username"
              name="username"
              margin="dense"
              autoComplete="username"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              margin="dense"
            />
            <SubmitButton
              variant="contained"
              fullWidth={true}
              loading={signInValues.loading}
              text="sign in"
              loadingText="signing in..."
              sx={authStyles.primaryBtn}
            />
          </Form>
        )}
      </Formik>
      <Box sx={signInStyles.forgotPasswordContainer}>
        <Link
          component={RouterLink}
          to="/password-recovery"
          underline="hover"
          sx={signInStyles.forgotPasswordLink}
        >
          Forgot Password?
        </Link>
      </Box>
      <Divider>or</Divider>
      <Button
        variant="outlined"
        component={RouterLink}
        to="/sign-up"
        sx={authStyles.secondaryBtn}
      >
        sign up
      </Button>
    </AuthModal>
  );
};
