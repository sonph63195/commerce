// biome-ignore lint/suspicious/noExplicitAny: This component receives 'field' from react-hook-form's Controller, which can have an 'any' type if the form's generic type is not fully specified.
"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { useFormContext, FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormFieldNameContext } from "./form-field";

function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  const { formState } = useFormContext();
  const fieldName = React.useContext(FormFieldNameContext);

  if (!fieldName) {
    console.error("FormMessage must be used within a FormField.");
    return null;
  }

  const error: FieldError | undefined = formState.errors[fieldName];

  if (!error) return null;

  return (
    <FormPrimitive.Message
      data-slot="form-message"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {error.message}
    </FormPrimitive.Message>
  );
}

export { FormMessage };