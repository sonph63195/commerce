"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "../input";
import { Field, FieldError, FieldLabel } from "../field";

interface FormInputProps extends React.ComponentProps<typeof Input> {
	name: string;
	label?: string;
}

function FormInput({ name, label, id, ...props }: FormInputProps) {
	const { control } = useFormContext();

	const fieldId = id || React.useId();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<Field data-invalid={fieldState.invalid}>
					{label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}
					<Input {...field} id={fieldId} {...props} />
					{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
				</Field>
			)}
		/>
	);
}

export { FormInput };
