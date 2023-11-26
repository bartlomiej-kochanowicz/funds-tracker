import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
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
		<form>
			<Input
				label="Hello world"
				placeholder="Placeholder text..."
				type="email"
				isRequired
				validationBehavior="native"
			/>
			<Button
				type="submit"
				className="mt-4"
			>
				submit
			</Button>
		</form>
	),
};

export const WithDescription: Story = {
	render: () => (
		<Input
			label="Hello world"
			placeholder="Placeholder text..."
			description="This is a description"
		/>
	),
};
