"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Checkbox } from "../checkbox";

interface FormCheckboxProps extends React.ComponentProps<typeof Checkbox> {
  name: string;
}

function FormCheckbox({ name, ...props }: FormCheckboxProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Checkbox
          checked={field.value}
          onCheckedChange={field.onChange}
          {...props}
        />
      )}
    />
  );
}

export { FormCheckbox };
