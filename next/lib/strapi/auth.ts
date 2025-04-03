import { ROUTES } from "@/app/api/routes.constants";
import { headers } from "../fetch-utils";
import { User } from "@/types/types";

export type AuthResult = {
  token: string;
  message: string;
  ok: boolean;
  user: User | null;
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
    const response = await fetch(ROUTES.auth.login, {
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
    const response = await fetch(ROUTES.auth.register, {
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
