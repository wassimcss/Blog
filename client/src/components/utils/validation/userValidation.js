import * as yup from "yup";

export const registerValid = yup.object().shape({
  name: yup.string().required("Required"),

  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  cf_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
export const loginValid = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
export const emailValid = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
});

export const passwordValid = yup.object().shape({
  password: yup
    .string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
