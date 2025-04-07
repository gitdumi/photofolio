"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/types/types";
import {
  AuthResult,
  createAccount,
  ForgotPasswordResult,
  makeForgotPasswordRequest,
  makeResetPasswordRequest,
  ResetPasswordResult,
  signIn,
} from "@/lib/strapi/auth";

const UserContext = createContext<UserContextType | null>(null);

type UserContextType = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<Partial<AuthResult>>;
  register: (email: string, password: string) => Promise<Partial<AuthResult>>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResult>;
  resetPassword: (props: {
    code: string;
    password: string;
    confirmPassword: string;
  }) => Promise<ResetPasswordResult>;
  logout: () => void;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (!!storedToken && !!storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const register = async (email: string, password: string) => {
    if (typeof window !== "undefined") {
      const { ok, user, token, message } = await createAccount(email, password);
      if (ok && user && user.confirmed && !user.blocked && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
      }
      return { message, ok };
    }
  };

  const login = async (email: string, password: string) => {
    if (typeof window !== "undefined") {
      const { ok, user, token, message } = await signIn(email, password);
      if (ok && user && user.confirmed && !user.blocked && token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setToken(token);
        setUser(user);
      }
      return { message, ok };
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    return await makeForgotPasswordRequest(email);
  };

  const resetPassword = async ({
    code,
    password,
    confirmPassword,
  }: {
    code: string;
    password: string;
    confirmPassword: string;
  }) => {
    return await makeResetPasswordRequest(code, password, confirmPassword);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useAuthContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useAuthContext must be used within a UserProvider");
  }
  return context;
};
