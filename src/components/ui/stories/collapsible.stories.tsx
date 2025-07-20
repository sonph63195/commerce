import type { Meta, StoryObj } from "@storybook/react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { Button } from "../button";
import { CaretSortIcon } from "@radix-ui/react-icons";

const meta: Meta<typeof Collapsible> = {
  component: Collapsible,
  title: "Components/Collapsible",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Collapsible>;

export const Default: Story = {
  args: {
    children: (
      <>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <CaretSortIcon className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/react-collapsible
          </div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/react-collapsible
          </div>
        </CollapsibleContent>
      </>
    ),
  },
};
