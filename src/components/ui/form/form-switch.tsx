"use client";

import * as React from "react";
import { useFormContext, Controller, ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { Switch } from "../switch";

interface FormSwitchProps extends React.ComponentProps<typeof Switch> {
  name: FieldPath<FieldValues>;
}

function FormSwitch({ name, ...props }: FormSwitchProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }: { field: ControllerRenderProps<FieldValues, FieldPath<FieldValues>> }) => (
        <Switch checked={field.value} onCheckedChange={field.onChange} {...props} />
      )}
    />
  );
}

export { FormSwitch };