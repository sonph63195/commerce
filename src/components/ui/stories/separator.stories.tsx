import type { Meta, StoryObj } from "@storybook/react";
import { Separator } from "../separator";

const meta: Meta<typeof Separator> = {
  component: Separator,
  title: "Components/Separator",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
  args: {
    className: "my-4",
  },
};

export const Vertical: Story = {
  args: {
    orientation: "vertical",
    className: "h-20",
  },
};
