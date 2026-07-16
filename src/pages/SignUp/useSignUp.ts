import * as Yup from "yup";
import { useState } from "react";
import { signUp } from "./signUp";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { getAxiosErrorMessage, passwordValidationSchema } from "@/shared/utils";
import { SignUpValues } from "./SignUpValues";

export const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues = {
    avatar: null,
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    avatar: Yup.mixed().required("User avatar required"),

    username: Yup.string()
      .trim()
      .required("Username required")
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be at most 15 characters"),

    email: Yup.string()
      .trim()
      .required("Email required")
      .matches(/^\S+@\S+\.\S+$/, "Invalid email format")
      .max(100, "Email must be at most 100 characters"),

    password: passwordValidationSchema.required("Password required"),

    confirmPassword: Yup.string()
      .required("Confirm password required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const onSubmit = async (values: SignUpValues): Promise<void> => {
    try {
      setLoading(true);
      await signUp(values);
      navigate("/sign-in");
      toast("User registered, check your email to activate it.", {
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
    signUpValues: { loading, initialValues, validationSchema },
    signUpActions: { onSubmit },
  };
};
