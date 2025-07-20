import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../typography";

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: "Components/Typography",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const H1: Story = {
  args: {
    variant: "h1",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const H2: Story = {
  args: {
    variant: "h2",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const H3: Story = {
  args: {
    variant: "h3",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const H4: Story = {
  args: {
    variant: "h4",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const P: Story = {
  args: {
    variant: "p",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const UL: Story = {
  args: {
    variant: "ul",
    children: (
      <>
        <li>First item</li>
        <li>Second item</li>
        <li>Third item</li>
      </>
    ),
  },
};

export const InlineCode: Story = {
  args: {
    variant: "inlineCode",
    children: "const a = 1;",
  },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Large: Story = {
  args: {
    variant: "large",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Small: Story = {
  args: {
    variant: "small",
    children: "The quick brown fox jumps over the lazy dog",
  },
};

export const Muted: Story = {
  args: {
    variant: "muted",
    children: "The quick brown fox jumps over the lazy dog",
  },
};
