import * as Yup from "yup";
import { useState } from "react";
import { resetPassword } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getAxiosErrorMessage, passwordValidationSchema } from "@/shared/utils";
import { NewPasswordFormProps } from "./NewPasswordFormProps";

export const useNewPasswordForm = (
  newPasswordFormProps: NewPasswordFormProps
) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { setActiveStep, username } = newPasswordFormProps;

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: passwordValidationSchema.required("New password required"),

    confirmNewPassword: Yup.string()
      .required("Confirm new password required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const onSubmit = async (values: { newPassword: string }): Promise<void> => {
    try {
      setLoading(true);
      await resetPassword(values, username);
      setActiveStep(3);
      navigate("/sign-in");
      toast("Your password has been changed successfully.", {
        type: "success",
        containerId: "A",
      });
    } catch (error) {
      toast(getAxiosErrorMessage(error), {
        type: "error",
        containerId: "A",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    newPasswordFormValues: {
      loading,
      initialValues,
      validationSchema,
    },
    newPasswordFormActions: {
      onSubmit,
    },
  };
};
