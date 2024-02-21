import * as Yup from "yup";
import { useState } from "react";
import { SignInValues } from "./interfaces";
import { AxiosResponse } from "axios";
import { signIn } from "./sign-in.service";
import { decodeJWT, getAxiosErrorMsg } from "@/shared/utils";
import { User } from "@/shared/interfaces";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "@/shared/contexts";

export const useSignIn = () => {
  const { setAuth } = useAuthContext();
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
      setAuth({ token: accessToken, user: payload });
      navigate("/");
    } catch (error) {
      const errorMsg: string = getAxiosErrorMsg(error, "sign in");
      toast(errorMsg, { type: "error", containerId: "A" });
    } finally {
      setLoading(false);
    }
  };

  return {
    signInValues: { loading, initialValues, validationSchema },
    signInActions: { onSubmit },
  };
};
