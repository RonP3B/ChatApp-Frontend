import { Formik, Form } from "formik";
import { InputField, SubmitButton } from "@/shared/components";
import { authStyles } from "@/shared/styles";
import { useFindUserForm } from "./find-user-form.hook";
import { Dispatch, SetStateAction } from "react";

export const FindUserForm: React.FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
  setUsername: Dispatch<SetStateAction<string>>;
}> = ({ setActiveStep, setUsername }) => {
  const { findUserFormValues, findUserFormActions } = useFindUserForm(
    setActiveStep,
    setUsername
  );

  return (
    <Formik
      initialValues={findUserFormValues.initialValues}
      validationSchema={findUserFormValues.validationSchema}
      onSubmit={findUserFormActions.onSubmit}
    >
      {() => (
        <Form>
          <InputField
            name="username"
            label="Username"
            margin="normal"
            autoComplete="username"
          />
          <SubmitButton
            variant="contained"
            fullWidth={true}
            loading={findUserFormValues.loading}
            text="find user"
            loadingText="finding user..."
            sx={authStyles.primaryBtn}
          />
        </Form>
      )}
    </Formik>
  );
};
