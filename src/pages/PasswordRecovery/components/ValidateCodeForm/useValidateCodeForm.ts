import { useState } from "react";
import { verifyCode } from "../../services";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "@/shared/utils";
import { ValidateCodeFormProps } from "./ValidateCodeFormProps";

export const useValidateCodeForm = (
  validateCodeFormProps: ValidateCodeFormProps
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setActiveStep, username } = validateCodeFormProps;

  const initialValues = { code: "" };

  const validationSchema = Yup.object({
    code: Yup.string().trim().required("Code required"),
  });

  const onSubmit = async (values: { code: string }): Promise<void> => {
    try {
      setLoading(true);
      await verifyCode(values, username);
      setActiveStep(2);
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
    validateCodeFormValues: {
      loading,
      initialValues,
      validationSchema,
    },
    validateCodeFormActions: {
      onSubmit,
    },
  };
};
