import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "../skeleton";

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: "Components/Skeleton",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    className: "h-[20px] w-[200px] rounded-md",
  },
};
