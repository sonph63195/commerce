import type { Meta, StoryObj } from "@storybook/react";
import Button from "./index";

const meta = {
	title: "Atoms/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "tertiary", "link"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl"],
		},
		buttonStyle: {
			control: "select",
			options: ["color", "gray"],
		},
		destructive: {
			control: "boolean",
		},
		iconPosition: {
			control: "select",
			options: [true, "leading", "trailing"],
		},
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Button",
		variant: "primary",
		size: "md",
		buttonStyle: "color",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button",
		variant: "secondary",
		size: "md",
		buttonStyle: "color",
	},
};

export const Tertiary: Story = {
	args: {
		children: "Button",
		variant: "tertiary",
		size: "md",
		buttonStyle: "color",
	},
};

export const Link: Story = {
	args: {
		children: "Button",
		variant: "link",
		size: "md",
		buttonStyle: "color",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Button",
		variant: "primary",
		size: "md",
		buttonStyle: "color",
		iconContent: "🔍",
		iconPosition: "leading",
	},
};

export const IconOnly: Story = {
	args: {
		iconContent: "🔍",
		iconPosition: true,
		variant: "primary",
		size: "md",
		buttonStyle: "color",
	},
};

export const Destructive: Story = {
	args: {
		children: "Delete",
		destructive: true,
		size: "md",
	},
};
