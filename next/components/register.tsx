"use client";
import React, { useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Container } from "./container";
import { useAuthContext } from "@/context/user-context";
import { withLoading } from "./hoc/withLoading";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn, formatEnumValueToText } from "@/lib/util/utils";
import { StatusIcons } from "./icons/status-icons";
import {
  AuthFormSubmitButtonLabel,
  FormFieldsForForm,
  FormType,
} from "@/lib/forms/constants";
import { useAuthForms } from "@/lib/forms/useAuthForms";
import { ZodType } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { SubmitStatus } from "@/types/types";

type FormValues = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  code?: string;
};

export const Register = withLoading(
  ({
    setIsLoading,
    state: submitMessage,
    setState: setSubmitMessage,
  }: {
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    state?: string;
    setState?: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const router = useRouter();
    const { login, register, resetPassword, forgotPassword } = useAuthContext();

    const setQueryParam = (
      key: string,
      value: string | boolean | undefined
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!key || typeof key !== "string" || typeof value !== "string") {
        console.error("Invalid query parameter key or value");
        return;
      }
      params.set(key, value);
      const newUrl = `?${params.toString()}`;

      if (newUrl.startsWith("?")) {
        router.push(newUrl);
      } else {
        console.error("Invalid URL redirection attempt");
      }
    };

    const searchParams = useSearchParams();
    const confirmationCode = searchParams.get("code") || "";
    const submitStatus = searchParams.get("status");

    const formType =
      (searchParams.get("formType") as FormType) || FormType.Login;
    const { formSchema } = useAuthForms(formType);

    const {
      register: registerField,
      handleSubmit,
      formState: { errors },
      clearErrors,
    } = useForm<FormValues>({
      resolver: zodResolver(formSchema as unknown as ZodType<FormValues>),
    });

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
      setIsLoading?.(true);

      switch (formType) {
        case FormType.Register: {
          const { ok, message } = await register(data.email, data.password);
          setQueryParam(
            "status",
            ok ? SubmitStatus.SUCCESS : SubmitStatus.ERROR
          );
          message && setSubmitMessage?.(message);

          if (ok) setTimeout(() => router.push("/"), 2000);
          break;
        }
        case FormType.Login: {
          const { ok, message } = await login(data.email, data.password);
          setQueryParam(
            "status",
            ok ? SubmitStatus.SUCCESS : SubmitStatus.ERROR
          );
          message && setSubmitMessage?.(message);
          if (ok) setTimeout(() => router.push("/"), 1000);
          break;
        }
        case FormType.ForgotPassword: {
          const { ok, message } = await forgotPassword(data.email);
          setQueryParam(
            "status",
            ok ? SubmitStatus.SUCCESS : SubmitStatus.ERROR
          );
          message && setSubmitMessage?.(message);
          break;
        }
        case FormType.ResetPassword: {
          const { ok, message } = await resetPassword({
            code: confirmationCode,
            password: data.password,
            confirmPassword: data.confirmPassword,
          });
          setQueryParam(
            "status",
            ok ? SubmitStatus.SUCCESS : SubmitStatus.ERROR
          );
          message && setSubmitMessage?.(message);
          break;
        }
      }
      setIsLoading?.(false);
    };

    const ErrorMessage = ({ name }: { name: string }) => (
      <span className="text-error h-4 mt-0 mb-2 text-sm">
        {errors?.[name]?.message || ""}
      </span>
    );

    return formType ? (
      <Container className="max-w-lg m-auto flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-4xl font-bold my-4">
          {formatEnumValueToText(formType)}
        </h1>
        <p className="text-center">
          {formType === FormType.Register
            ? "Create an account so you can purchase photos or collections"
            : "Login to access your account"}
        </p>

        <form
          className="w-full my-4 flex flex-col sm:min-w-[500px]"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {FormFieldsForForm[formType].map((field) => {
            return (
              <div
                key={`${formType}-${field.name}`}
                className="flex flex-col gap-1"
              >
                <input
                  {...registerField(field.name)}
                  type={field.type}
                  placeholder={`${field.placeholder}${
                    field.required ? "*" : ""
                  }`}
                  className={cn(
                    "input w-full",
                    errors?.[field.name] && "border-error"
                  )}
                />
                <ErrorMessage name={field.name} />
              </div>
            );
          })}

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary w-full py-3">
              <span className="text-sm">
                {AuthFormSubmitButtonLabel[formType]}
              </span>
            </button>
          </div>
          {submitMessage && submitStatus && (
            <div
              role="alert"
              className={cn(
                "alert mt-8",
                submitStatus === SubmitStatus.SUCCESS
                  ? "alert-success"
                  : "alert-error"
              )}
            >
              {submitStatus === SubmitStatus.SUCCESS ? (
                <StatusIcons.Success />
              ) : (
                <StatusIcons.Error />
              )}
              <span>{submitMessage}</span>
            </div>
          )}
          {FormType.Register === formType && (
            <button
              className="btn btn-outline mx-auto mt-8 mb-2 w-fit"
              onClick={(e) => {
                e.preventDefault();
                clearErrors();
                setSubmitMessage?.("");
                setQueryParam("formType", FormType.Login);
              }}
            >
              Already have an account?
            </button>
          )}
          {FormType.Login === formType && (
            <>
              <button
                className="btn btn-outline mx-auto mt-8 mb-2 w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  clearErrors();
                  setSubmitMessage?.("");
                  setQueryParam("formType", FormType.Register);
                }}
              >
                Want to create an account?
              </button>
              <button
                className="btn btn-link mx-auto mb-2 w-fit"
                onClick={(e) => {
                  e.preventDefault();
                  clearErrors();
                  setSubmitMessage?.("");
                  setQueryParam("formType", FormType.ForgotPassword);
                }}
              >
                Forgot your password?
              </button>
            </>
          )}
          {[FormType.ForgotPassword, FormType.ResetPassword].includes(
            formType
          ) && (
            <button
              className="btn btn-outline mx-auto mt-8 mb-2 w-fit"
              onClick={(e) => {
                e.preventDefault();
                clearErrors();
                setSubmitMessage?.("");
                setQueryParam("formType", FormType.Register);
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </Container>
    ) : null;
  }
);
