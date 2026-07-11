import * as Yup from "yup";

export const passwordValidationSchema = Yup.string()
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
  .matches(/^(?=.{8,})/, "The password must have a minimum of 8 characters");
