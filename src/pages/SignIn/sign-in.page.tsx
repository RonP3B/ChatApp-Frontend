import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { useSignIn } from "./sign-in.hook";
import { Box, Typography, Button, Link, Divider } from "@mui/material";
import { AuthModal, InputField, SubmitButton } from "@/shared/components";
import { authStyles } from "@/shared/styles";

export const SignIn: React.FC = () => {
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
      <Box my={1}>
        <Link
          component={RouterLink}
          to="/password-recovery"
          underline="hover"
          fontWeight={500}
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
