import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
	component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	render: () => <Input placeholder="Placeholder text..." />,
};

export const Disabled: Story = {
	render: () => (
		<Input
			disabled
			placeholder="Placeholder text..."
		/>
	),
};
