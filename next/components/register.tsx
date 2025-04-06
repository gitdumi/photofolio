"use client";
import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container } from "./container";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/user-context";
import { withLoading } from "./hoc/withLoading";
import { getAuthFormSchema } from "@/lib/form-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { StatusIcons } from "./icons/status-icons";

type FormValues = {
  username?: string;
  email: string;
  password: string;
};

export const Register = withLoading(
  ({
    setIsLoading,
    state: submitError,
    setState: setSubmitError,
  }: {
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const router = useRouter();
    const { login, register } = useAuthContext();
    const [isRegistering, setIsRegistering] = React.useState(true);

    const formSchema = useMemo(
      () => getAuthFormSchema({ isRegister: isRegistering }),
      [isRegistering]
    );

    const {
      register: registerField,
      handleSubmit,
      formState: { errors },
      clearErrors,
    } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
      setIsLoading?.(true);

      if (isRegistering) {
        const { ok, message } = await register(data.email, data.password);
        setIsLoading?.(false);
        if (!ok) {
          setSubmitError(message);
        } else {
          router.push("/");
        }
      } else {
        const { ok, message } = await login(data.email, data.password);
        setIsLoading?.(false);
        if (!ok) {
          setSubmitError(message);
        } else {
          router.push("/");
        }
      }
    };

    const ErrorMessage = ({ name, text }: { name?: string; text?: string }) => (
      <span className="text-error h-4 mt-0 mb-2 text-sm">
        {errors?.[name]?.message || ""}
        {text || ""}
      </span>
    );

    console.log({ submitError });

    return (
      <Container className="max-w-lg m-auto flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-4xl font-bold my-4">
          {isRegistering ? "Register" : "Sign in"}
        </h1>
        <p className="text-center">
          {isRegistering
            ? "Create an account so you can purchase photos or collections"
            : "Login to access your account"}
        </p>

        <form
          className="w-full my-4 flex flex-col sm:min-w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          {isRegistering && (
            <div className="flex flex-col gap-1">
              <input
                {...registerField("username")}
                type="text"
                placeholder="Username*"
                className={cn(
                  "input w-full",
                  errors.username && "border-error"
                )}
              />
              <ErrorMessage name={"username"} />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <input
              {...registerField("email")}
              type="email"
              placeholder="Email Address*"
              className={cn("input w-full", errors.email && "border-error")}
            />
            <ErrorMessage name={"email"} />
          </div>
          <div className="flex flex-col gap-1">
            <input
              {...registerField("password")}
              type="password"
              placeholder="Password*"
              className={cn("input w-full", errors.password && "border-error")}
            />
            <ErrorMessage name={"password"} />
          </div>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary w-full py-3">
              <span className="text-sm">
                {isRegistering ? "Register" : "Sign in"}
              </span>
            </button>
          </div>
          {submitError && (
            <div role="alert" className="alert alert-error mt-8">
              <StatusIcons.Error />
              <span>{submitError}</span>
            </div>
          )}
          <button
            className="btn btn-outline mx-auto mt-8 mb-2 w-fit"
            onClick={(e) => {
              e.preventDefault();
              clearErrors();
              setSubmitError("");
              setIsRegistering((prev) => !prev);
            }}
          >
            {isRegistering
              ? "Already have an account?"
              : "Want to create an account?"}
          </button>
        </form>
      </Container>
    );
  }
);
