"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { useFormContext, Controller } from "react-hook-form";

// Create a context to pass the field name down
const FormFieldNameContext = React.createContext<string | undefined>(undefined);

interface FormFieldProps extends React.ComponentProps<typeof FormPrimitive.Field> {
  name: string;
  children?: React.ReactNode;
}

function FormField({ name, children, ...props }: FormFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormFieldNameContext.Provider value={field.name}>
          <FormPrimitive.Field {...props} {...field} data-slot="form-field">
            {children}
          </FormPrimitive.Field>
        </FormFieldNameContext.Provider>
      )}
    />
  );
}

export { FormField, FormFieldNameContext };