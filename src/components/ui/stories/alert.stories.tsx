import type { Meta, StoryObj } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../alert";

const meta: Meta<typeof Alert> = {
  component: Alert,
  title: "Components/Alert",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    children: (
      <>
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: (
      <>
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>
          Your action could not be completed.
        </AlertationDescription>
      </>
    ),
  },
};
