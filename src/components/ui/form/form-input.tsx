"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../input";

interface FormInputProps extends React.ComponentProps<typeof Input> {
  name: string;
}

function FormInput({ name, ...props }: FormInputProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Input {...field} {...props} />}
    />
  );
}

export { FormInput };
