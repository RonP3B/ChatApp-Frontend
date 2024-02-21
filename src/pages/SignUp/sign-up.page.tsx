import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { authStyles } from "@/shared/styles";
import { useSignUp } from "./sign-up.hook";
import { Button, Divider, Grid, Typography } from "@mui/material";
import {
  AuthModal,
  ImageInput,
  InputField,
  SubmitButton,
} from "@/shared/components";

export const SignUp: React.FC = () => {
  const { signUpValues, signUpActions } = useSignUp();

  return (
    <AuthModal>
      <Typography variant="h4" color="primary" sx={authStyles.title}>
        Sign Up
      </Typography>
      <Formik
        initialValues={signUpValues.initialValues}
        onSubmit={signUpActions.onSubmit}
        validationSchema={signUpValues.validationSchema}
      >
        {() => (
          <Form>
            <ImageInput name="avatar" variant="outlined" label="User avatar" />
            <Grid container spacing={1.5}>
              <Grid item xs={12} md={6}>
                <InputField label="Username" name="username" />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Email"
                  type="email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField label="Password" name="password" type="password" />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputField
                  label="Confirm password"
                  name="confirmPassword"
                  type="password"
                />
              </Grid>
            </Grid>
            <SubmitButton
              variant="contained"
              fullWidth={true}
              loading={signUpValues.loading}
              text="sign up"
              loadingText="signing up..."
              sx={authStyles.primaryBtn}
            />
          </Form>
        )}
      </Formik>
      <Divider sx={{ mt: 1 }}>or</Divider>
      <Button
        variant="outlined"
        component={RouterLink}
        to="/sign-in"
        sx={authStyles.secondaryBtn}
      >
        sign in
      </Button>
    </AuthModal>
  );
};
