"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { useForm, UseFormProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormProps<TFormValues extends Record<string, any>>
  extends UseFormProps<TFormValues> {
  children: React.ReactNode;
  onSubmit: (data: TFormValues) => void;
}

function Form<TFormValues extends Record<string, any>>({
  children,
  onSubmit,
  ...props
}: FormProps<TFormValues>) {
  const methods = useForm<TFormValues>(props);
  return (
    <FormPrimitive.Root onSubmit={methods.handleSubmit(onSubmit)} data-slot="form">
      <form>{children}</form>
    </FormPrimitive.Root>
  );
}

export { Form };
