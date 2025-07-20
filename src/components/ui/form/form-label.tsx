"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";
import { cn } from "@/lib/utils";

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Label>) {
  return (
    <FormPrimitive.Label
      data-slot="form-label"
      className={cn("text-sm font-medium leading-none", className)}
      {...props}
    />
  );
}

export { FormLabel };
