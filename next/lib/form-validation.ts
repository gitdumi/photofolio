import { z } from "zod";

export const getAuthFormSchema = ({ isRegister }: { isRegister: boolean }) => {
  if (isRegister)
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
  else
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
};
