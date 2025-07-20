"use client";

import * as React from "react";
import * as FormPrimitive from "@radix-ui/react-form";

import { cn } from "@/lib/utils";

function Form({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Root>) {
  return (
    <FormPrimitive.Root
      data-slot="form"
      className={cn("space-y-4", className)}
      {...props}
    />
  );
}

function FormField({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Field>) {
  return <FormPrimitive.Field data-slot="form-field" {...props} />;
}

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

function FormControl({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Control>) {
  return <FormPrimitive.Control data-slot="form-control" {...props} />;
}

function FormMessage({
  className,
  ...props
}: React.ComponentProps<typeof FormPrimitive.Message>) {
  return (
    <FormPrimitive.Message
      data-slot="form-message"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    />
  );
}

function FormSubmit({
  ...props
}: React.ComponentProps<typeof FormPrimitive.Submit>) {
  return <FormPrimitive.Submit data-slot="form-submit" {...props} />;
}

export {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormSubmit,
};
