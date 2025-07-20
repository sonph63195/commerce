"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Textarea } from "../textarea";

interface FormTextareaProps extends React.ComponentProps<typeof Textarea> {
  name: string;
}

function FormTextarea({ name, ...props }: FormTextareaProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <Textarea {...field} {...props} />}
    />
  );
}

export { FormTextarea };
