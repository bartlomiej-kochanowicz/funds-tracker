import type { Meta, StoryObj } from "@storybook/react";

import { H1 } from "../Heading";
import { Text } from "../Text";
import { Panel } from "./Panel";

const meta: Meta<typeof Panel> = {
	component: Panel,
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
	render: () => (
		<Panel>
			<H1>Hello world</H1>
			<Text>Hello world</Text>
		</Panel>
	),
};
