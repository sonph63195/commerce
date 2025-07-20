"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";

function FormControl({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Control>) {
  return <FormPrimitive.Control data-slot="form-control" {...props} />;
}

export { FormControl };
