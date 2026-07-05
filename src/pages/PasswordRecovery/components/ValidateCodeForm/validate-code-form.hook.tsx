import { Dispatch, SetStateAction, useState } from "react";
import { verifyCode } from "../../services";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { buildGenericErrorMessage } from "@/shared/utils";

export const useValidateCodeForm = (
  setActiveStep: Dispatch<SetStateAction<number>>,
  username: string
) => {
  const [loading, setLoading] = useState<boolean>(false);

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
      toast(buildGenericErrorMessage("validate the code"), {
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
