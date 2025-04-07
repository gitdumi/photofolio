export enum FormType {
  Register = "REGISTER",
  Login = "SIGN_IN",
  ResetPassword = "RESET_PASSWORD",
  ForgotPassword = "FORGOT_PASSWORD",
}

export const AuthFormSubmitButtonLabel = {
  [FormType.Register]: "Register",
  [FormType.Login]: "Sign in",
  [FormType.ResetPassword]: "Reset password",
  [FormType.ForgotPassword]: "Send email to reset password",
};

type FormFieldData = {
  name: string;
  placeholder: string;
  type: "text" | "password" | "email";
  required: boolean;
};

export const formFields: { [k: string]: FormFieldData } = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
    required: true,
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    required: true,
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    required: true,
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm password",
    required: true,
  },
};

export const FormFieldsForForm = {
  [FormType.Login]: [formFields.email, formFields.password],
  [FormType.Register]: [
    formFields.username,
    formFields.email,
    formFields.password,
  ],
  [FormType.ForgotPassword]: [formFields.email],
  [FormType.ResetPassword]: [formFields.password, formFields.confirmPassword],
};
