"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { useFormContext, Controller } from "react-hook-form";

interface FormFieldProps extends React.ComponentProps<typeof FormPrimitive.Field> {
  name: string;
}

function FormField({ name, ...props }: FormFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormPrimitive.Field {...props} {...field} data-slot="form-field" />
      )}
    />
  );
}

export { FormField };
