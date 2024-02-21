import * as Yup from "yup";
import { useState } from "react";
import { SignUpValues } from "./interfaces";
import { signUp } from "./sign-up.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAxiosErrorMsg } from "@/shared/utils";

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

    password: Yup.string()
      .required("Password required")
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
      const errorMsg: string = getAxiosErrorMsg(error, "sign up");
      toast(errorMsg, { type: "error", containerId: "A" });
    } finally {
      setLoading(false);
    }
  };

  return {
    signUpValues: { loading, initialValues, validationSchema },
    signUpActions: { onSubmit },
  };
};
