"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { FormLabel } from "./form-label";

interface FormRadioGroupProps extends React.ComponentProps<typeof RadioGroup> {
  name: string;
  options: { label: string; value: string }[];
}

function FormRadioGroup({ name, options, ...props }: FormRadioGroupProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup onValueChange={field.onChange} value={field.value} {...props}>
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <FormLabel htmlFor={option.value}>{option.label}</FormLabel>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
}

export { FormRadioGroup };
