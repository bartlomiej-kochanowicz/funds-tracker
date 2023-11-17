import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
	component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
	render: () => (
		<Input
			label="Hello world"
			placeholder="Placeholder text..."
		/>
	),
};

export const Disabled: Story = {
	render: () => (
		<Input
			isDisabled
			label="Hello world"
			placeholder="Placeholder text..."
		/>
	),
};

export const Invalid: Story = {
	render: () => (
		<Input
			isInvalid
			errorMessage="This is an error message"
			label="Hello world"
			placeholder="Placeholder text..."
		/>
	),
};
