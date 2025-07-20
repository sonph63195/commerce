// biome-ignore lint/suspicious/noExplicitAny: This component receives 'field' from react-hook-form's Controller, which can have an 'any' type if the form's generic type is not fully specified.
"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Switch } from "../switch";

interface FormSwitchProps extends React.ComponentProps<typeof Switch> {
  name: string;
}

function FormSwitch({ name, ...props }: FormSwitchProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch checked={field.value} onCheckedChange={field.onChange} {...props} />
      )}
    />
  );
}

export { FormSwitch };