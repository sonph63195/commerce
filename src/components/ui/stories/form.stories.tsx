import type { Meta, StoryObj } from "@storybook/react";
import { Form, FormControl, FormField, FormLabel, FormMessage, FormSubmit, FormInput } from "../form";
import { Button } from "../button";

const meta: Meta<typeof Form> = {
  component: Form,
  title: "Components/Form",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {
    children: (
      <form onSubmit={(e) => e.preventDefault()}>
        <FormField name="email">
          <FormLabel>Email</FormLabel>
          <FormControl asChild>
            <FormInput type="email" required />
          </FormControl>
          <FormMessage match="valueMissing">Please enter your email</FormMessage>
          <FormMessage match="typeMismatch">Please provide a valid email</FormMessage>
        </FormField>
        <FormSubmit asChild>
          <Button>Submit</Button>
        </FormSubmit>
      </form>
    ),
  },
};
