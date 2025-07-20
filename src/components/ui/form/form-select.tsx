"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../select";

interface FormSelectProps extends React.ComponentProps<typeof Select> {
  name: string;
  placeholder?: string;
  options: { label: string; value: string }[];
}

function FormSelect({ name, placeholder, options, ...props }: FormSelectProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select onValueChange={field.onChange} value={field.value} {...props}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

export { FormSelect };
