import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup, RadioGroupItem } from "../radio-group";
import { Label } from "../label";

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  title: "Components/RadioGroup",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    defaultValue: "comfortable",
    children: (
      <>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="default" id="r1" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="comfortable" id="r2" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="compact" id="r3" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </>
    ),
  },
};
