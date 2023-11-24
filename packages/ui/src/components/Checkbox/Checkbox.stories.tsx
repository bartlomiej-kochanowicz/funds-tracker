import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
	component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	render: () => <Checkbox id="test">Hello world</Checkbox>,
};

export const Disabled: Story = {
	render: () => (
		<Checkbox
			id="test"
			isDisabled
		>
			Hello world
		</Checkbox>
	),
};
