import type { Meta, StoryObj } from "@storybook/react";
import ButtonLink from "./index";

const meta = {
	title: "Atoms/ButtonLink",
	component: ButtonLink,
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
		href: {
			control: "text",
		},
	},
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: "Button Link",
		variant: "primary",
		size: "md",
		buttonStyle: "color",
		href: "#",
	},
};

export const Secondary: Story = {
	args: {
		children: "Button Link",
		variant: "secondary",
		size: "md",
		buttonStyle: "color",
		href: "#",
	},
};

export const Tertiary: Story = {
	args: {
		children: "Button Link",
		variant: "tertiary",
		size: "md",
		buttonStyle: "color",
		href: "#",
	},
};

export const Link: Story = {
	args: {
		children: "Button Link",
		variant: "link",
		size: "md",
		buttonStyle: "color",
		href: "#",
	},
};

export const WithIcon: Story = {
	args: {
		children: "Button Link",
		variant: "primary",
		size: "md",
		buttonStyle: "color",
		iconContent: "🔍",
		iconPosition: "leading",
		href: "#",
	},
};

export const IconOnly: Story = {
	args: {
		iconContent: "🔍",
		iconPosition: true,
		variant: "primary",
		size: "md",
		buttonStyle: "color",
		href: "#",
	},
};
