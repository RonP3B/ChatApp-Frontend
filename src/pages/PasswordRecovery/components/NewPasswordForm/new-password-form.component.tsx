import { Formik, Form } from "formik";
import { InputField, SubmitButton } from "@/shared/components";
import { authStyles } from "@/shared/styles";
import { useNewPasswordForm } from "./new-password-form.hook";
import { Dispatch, SetStateAction } from "react";

export const NewPasswordForm: React.FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
  username: string;
}> = ({ setActiveStep, username }) => {
  const { newPasswordFormValues, newPasswordFormActions } = useNewPasswordForm(
    setActiveStep,
    username
  );

  return (
    <Formik
      initialValues={newPasswordFormValues.initialValues}
      validationSchema={newPasswordFormValues.validationSchema}
      onSubmit={newPasswordFormActions.onSubmit}
    >
      {() => (
        <Form>
          <InputField
            type="password"
            name="newPassword"
            label="New password"
            margin="dense"
          />
          <InputField
            type="password"
            name="confirmNewPassword"
            label="Confirm new password"
            margin="dense"
          />
          <SubmitButton
            variant="contained"
            fullWidth={true}
            loading={newPasswordFormValues.loading}
            text="change password"
            loadingText="changing password..."
            sx={authStyles.primaryBtn}
          />
        </Form>
      )}
    </Formik>
  );
};
