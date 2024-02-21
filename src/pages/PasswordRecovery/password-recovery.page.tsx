import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { authStyles } from "@/shared/styles";
import { FindUserForm, NewPasswordForm, ValidateCodeForm } from "./components";
import { AuthModal } from "@/shared/components";
import {
  Button,
  Divider,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

export const PasswordRecovery: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const stepLabels: string[] = ["Find User", "Confirm Code", "Change Password"];

  return (
    <AuthModal>
      <Typography variant="h4" color="primary" sx={authStyles.title}>
        Password Recovery
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <FindUserForm setActiveStep={setActiveStep} setUsername={setUsername} />
      )}
      {activeStep === 1 && (
        <ValidateCodeForm setActiveStep={setActiveStep} username={username} />
      )}
      {activeStep === 2 && (
        <NewPasswordForm setActiveStep={setActiveStep} username={username} />
      )}
      <Divider sx={{ my: 1 }}>or</Divider>
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
