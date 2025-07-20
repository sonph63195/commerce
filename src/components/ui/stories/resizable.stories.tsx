import type { Meta, StoryObj } from "@storybook/react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../resizable";

const meta: Meta<typeof ResizablePanelGroup> = {
  component: ResizablePanelGroup,
  title: "Components/Resizable",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResizablePanelGroup>;

export const Default: Story = {
  args: {
    direction: "horizontal",
    className: "min-h-[200px] rounded-lg border",
    children: (
      <>
        <ResizablePanel defaultSize={25}>
          <div className="flex h-[200px] items-center justify-center p-6">One</div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-[200px] items-center justify-center p-6">Two</div>
        </ResizablePanel>
      </>
    ),
  },
};
