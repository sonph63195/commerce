import type { Meta, StoryObj } from "@storybook/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card";

const meta: Meta<typeof HoverCard> = {
  component: HoverCard,
  title: "Components/HoverCard",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  args: {
    children: (
      <>
        <HoverCardTrigger>Hover over me</HoverCardTrigger>
        <HoverCardContent>
          This is the hover card content.
        </HoverCardContent>
      </>
    ),
  },
};
