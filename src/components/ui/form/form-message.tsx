"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  const { formState } = useFormContext();
  const error = formState.errors[props.name as string];

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
