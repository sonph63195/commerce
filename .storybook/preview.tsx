import type { Preview } from "@storybook/react";

import "../src/app/globals.css";

import Provider from "../src/components/provider";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story) => (
			<Provider>
				<Story />
			</Provider>
		),
	],
};

export default preview;
