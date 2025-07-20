import type { Meta, StoryObj } from "@storybook/react";
import { AspectRatio } from "../aspect-ratio";

const meta: Meta<typeof AspectRatio> = {
  component: AspectRatio,
  title: "Components/AspectRatio",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AspectRatio>;

export const Default: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <img
        src="https://images.unsplash.com/photo-1576075796033-848c2a5f05b6?w=800&dpr=2&q=80"
        alt="Photo by Alvaro Pinot"
        className="rounded-md object-cover"
      />
    ),
  },
};
