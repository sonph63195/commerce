import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "../sonner";
import { Button } from "../button";
import { toast } from "sonner";

const meta: Meta<typeof Toaster> = {
  component: Toaster,
  title: "Components/Sonner",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Toaster>;

export const Default: Story = {
  args: {
    children: (
      <Button
        variant="outline"
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        Show Toast
      </Button>
    ),
  },
};
