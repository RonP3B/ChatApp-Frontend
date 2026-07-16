import * as Yup from "yup";
import { useState } from "react";
import { AxiosResponse } from "axios";
import { decodeJWT, getAxiosErrorMessage } from "@/shared/utils";
import { User } from "@/shared/types";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { authStatus, useAuthActions } from "@/shared/contexts/AuthContext";
import { SignInValues } from "./SignInValues";
import { signIn } from "./signIn";

export const useSignIn = () => {
  const { setAuth } = useAuthActions();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: SignInValues = { username: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().trim().required("Username required"),
    password: Yup.string().trim().required("Password required"),
  });

  const onSubmit = async (values: SignInValues): Promise<void> => {
    try {
      setLoading(true);
      const res: AxiosResponse = await signIn(values);
      const accessToken: string = res.data.accessToken;
      const payload: User = decodeJWT(accessToken);
      setAuth({
        status: authStatus.Authenticated,
        token: accessToken,
        user: payload,
      });
      navigate("/");
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
    signInValues: { loading, initialValues, validationSchema },
    signInActions: { onSubmit },
  };
};
