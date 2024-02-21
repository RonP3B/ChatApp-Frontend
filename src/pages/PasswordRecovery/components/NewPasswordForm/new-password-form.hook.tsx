import * as Yup from "yup";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { resetPassword } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAxiosErrorMsg } from "@/shared/utils";

export const useNewPasswordForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  username: string
) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password required")
      .matches(
        /^(?=.*[a-z])/,
        "The password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "The password must contain at least one uppercase letter"
      )
      .matches(/^(?=.*\d)/, "The password must contain at least one number")
      .matches(
        /^(?=.*[!@#$%^&*()_\-+=[\]{};:<>|./?])/,
        "The password must contain at least one special character"
      )
      .matches(
        /^(?=.{8,})/,
        "The password must have a minimum of 8 characters"
      ),

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
      const errorMsg: string = getAxiosErrorMsg(error, "change the password");
      toast(errorMsg, { type: "error", containerId: "A" });
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
