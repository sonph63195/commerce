import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Components/Input",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
};
