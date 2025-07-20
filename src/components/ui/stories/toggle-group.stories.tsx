import type { Meta, StoryObj } from "@storybook/react";
import { ToggleGroup, ToggleGroupItem } from "../toggle-group";
import { BoldIcon, ItalicIcon, UnderlineIcon } from "lucide-react";

const meta: Meta<typeof ToggleGroup> = {
  component: ToggleGroup,
  title: "Components/ToggleGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

export const Default: Story = {
  args: {
    type: "multiple",
    children: (
      <>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <BoldIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <ItalicIcon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <UnderlineIcon className="h-4 w-4" />
        </ToggleGroupItem>
      </>
    ),
  },
};
