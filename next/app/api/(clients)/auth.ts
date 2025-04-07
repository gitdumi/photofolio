import { API_ROUTES } from "@/app/api/(clients)/routes.constants";
import { headers } from "../../../lib/util/fetch-utils";
import { User } from "@/types/types";

export type AuthResult = {
  token: string;
  message: string;
  ok: boolean;
  user: User | null;
};

export type ForgotPasswordResult = {
  code: string | null;
  message: string;
  ok: boolean;
};

export type ResetPasswordResult = {
  message: string;
  ok: boolean;
};

export const signIn = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  let result: AuthResult = {
    token: "",
    message: "",
    ok: false,
    user: null,
  };

  try {
    const response = await fetch(API_ROUTES.auth.login, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    result.token = data.jwt;
    result.message = data.message;
    result.ok = response.ok;
    result.user = data.user;
  } catch (error) {
    result.message = "An error occurred. Please try again.";
    result.ok = false;
  }
  return result;
};

export const createAccount = async (
  email: string,
  password: string
): Promise<AuthResult> => {
  let result: AuthResult = {
    token: "",
    message: "",
    ok: false,
    user: null,
  };

  try {
    const response = await fetch(API_ROUTES.auth.register, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    result.token = data.jwt;
    result.message = data.message;
    result.ok = response.ok;
    result.user = data.user;
  } catch (error) {
    result.message = "An error occurred. Please try again.";
    result.ok = false;
  }
  return result;
};

export const makeForgotPasswordRequest = async (email: string) => {
  let result: ForgotPasswordResult = {
    ok: false,
    message: "",
    code: null,
  };

  try {
    const response = await fetch(API_ROUTES.auth.forgotPassword, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();
    result.code = data.code;
    result.message = data.message;
    result.ok = response.ok;
  } catch (error) {
    result.message = "An error occurred. Please try again.";
    result.ok = false;
  }
  return result;
};

export const makeResetPasswordRequest = async (
  code: string,
  password: string,
  confirmPassword: string
) => {
  let result: ResetPasswordResult = {
    ok: false,
    message: "",
  };

  try {
    const response = await fetch(API_ROUTES.auth.resetPassword, {
      method: "POST",
      headers,
      body: JSON.stringify({
        code,
        password,
        passwordConfirmation: confirmPassword,
      }),
    });
    const data = await response.json();
    result.message = data.message;
    result.ok = response.ok;
  } catch (error) {
    result.message = "An error occurred. Please try again.";
    result.ok = false;
  }
  return result;
};
