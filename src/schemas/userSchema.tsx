import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string()
    .matches(/^[\w.+]+@gmail\.com$/, "Only Gmail mail is allowed.")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = Yup.object({
  name: Yup.string().required("Full name is required."),
  email: Yup.string()
    .matches(/^[\w.+]+@gmail\.com$/, "Only Gmail mail is allowed.")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password should be at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character"
    )
    .min(8, "Password must be at least 8 characters"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password")], "Both password need to be match.")
    .required("Confirm password is required."),
  phone: Yup.string().required("Phone number is required."),
  batch: Yup.string()
    .oneOf(["WEB-6", "WEB-7", "WEB-8", "WEB-9"])
    .required("Batch is required."),
});
