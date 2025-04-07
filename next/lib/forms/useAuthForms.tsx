import { useMemo } from "react";
import { getAuthFormSchema } from "./form-validation";
import { FormType } from "./constants";
import { ZodType } from "zod";

export const useAuthForms = (formType?: FormType): { formSchema: ZodType } => {
  const formSchema = useMemo(
    () => (formType ? getAuthFormSchema(formType) : null),
    [formType]
  );

  return { formSchema };
};
