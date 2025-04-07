import { z } from "zod";
import { FormType } from "./constants";

export const getAuthFormSchema = (formType: FormType) => {
  switch (formType) {
    case FormType.Register:
      return z.object({
        username: z
          .string()
          .min(3, "Username must be at least 3 characters long")
          .nonempty("This field is required"),
        email: z
          .string()
          .email("Invalid email address")
          .nonempty("This field is required"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .nonempty("This field is required"),
      });
    case FormType.Login:
      return z.object({
        email: z
          .string()
          .email("Invalid email address")
          .nonempty("This field is required"),
        password: z
          .string()
          .min(6, "Password must be at least 6 characters long")
          .nonempty("This field is required"),
      });
    case FormType.ForgotPassword:
      return z.object({
        email: z
          .string()
          .email("Invalid email address")
          .nonempty("This field is required"),
      });
    case FormType.ResetPassword:
      return z
        .object({
          password: z
            .string()
            .min(6, "Password must be at least 6 characters long")
            .nonempty("This field is required"),
          confirmPassword: z.string().nonempty("This field is required"),
        })
        .refine((data) => data.password === data.confirmPassword, {
          message: "Passwords must match",
          path: ["confirmPassword"],
        });
  }
};
