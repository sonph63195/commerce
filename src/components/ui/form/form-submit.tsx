"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";

function FormSubmit({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Submit>) {
  return <FormPrimitive.Submit data-slot="form-submit" {...props} />;
}

export { FormSubmit };
