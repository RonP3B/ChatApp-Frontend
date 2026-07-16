import { useState } from "react";
import * as Yup from "yup";
import { findUser } from "../../services";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/shared/utils";
import { FindUserFormProps } from "./FindUserFormProps";

export const useFindUserForm = (findUserFormProps: FindUserFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setActiveStep, setUsername } = findUserFormProps;

  const initialValues = {
    username: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .trim()
      .required("Username required")
      .min(3, "Username must be at least 3 characters")
      .max(15, "Username must be at most 15 characters"),
  });

  const onSubmit = async (values: { username: string }): Promise<void> => {
    try {
      setLoading(true);
      await findUser(values);
      setActiveStep(1);
      setUsername(values.username);
      toast("The validation code has been sent to the user's email.", {
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
    findUserFormValues: { loading, initialValues, validationSchema },
    findUserFormActions: { onSubmit },
  };
};
