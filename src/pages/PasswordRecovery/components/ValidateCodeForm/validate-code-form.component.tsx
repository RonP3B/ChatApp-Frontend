import { Formik, Form } from "formik";
import { InputField, SubmitButton } from "@/shared/components";
import { authStyles } from "@/shared/styles";
import { useValidateCodeForm } from "./validate-code-form.hook";
import { Box, Link } from "@mui/material";
import { Dispatch, Fragment, SetStateAction } from "react";

export const ValidateCodeForm: React.FC<{
  setActiveStep: Dispatch<SetStateAction<number>>;
  username: string;
}> = ({ setActiveStep, username }) => {
  const { validateCodeFormValues, validateCodeFormActions } =
    useValidateCodeForm(setActiveStep, username);

  return (
    <Fragment>
      <Formik
        initialValues={validateCodeFormValues.initialValues}
        validationSchema={validateCodeFormValues.validationSchema}
        onSubmit={validateCodeFormActions.onSubmit}
      >
        {() => (
          <Form>
            <InputField name="code" label="Validation code" margin="normal" />
            <SubmitButton
              variant="contained"
              fullWidth={true}
              loading={validateCodeFormValues.loading}
              text="validate code"
              loadingText="validating code..."
              sx={authStyles.primaryBtn}
            />
          </Form>
        )}
      </Formik>
      <Box mt={1}>
        <Link
          href="#"
          underline="hover"
          fontWeight={500}
          onClick={() => setActiveStep(0)}
        >
          Didn&apos;t get the code?
        </Link>
      </Box>
    </Fragment>
  );
};
