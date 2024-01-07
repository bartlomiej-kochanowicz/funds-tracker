import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { Radio } from ".";

const meta: Meta<typeof Radio> = {
	component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
	render: () => (
		<Radio label="Hello world">
			<Radio.Button value="dogs">Dogs</Radio.Button>
			<Radio.Button value="cats">Cats</Radio.Button>
		</Radio>
	),
};

export const DisabledRadioButton: Story = {
	render: () => (
		<Radio label="Hello world">
			<Radio.Button
				value="dogs"
				isDisabled
			>
				Dogs
			</Radio.Button>
			<Radio.Button value="cats">Cats</Radio.Button>
		</Radio>
	),
};

export const DisabledRadioGroup: Story = {
	render: () => (
		<Radio
			label="Hello world"
			isDisabled
		>
			<Radio.Button
				value="dogs"
				isDisabled
			>
				Dogs
			</Radio.Button>
			<Radio.Button value="cats">Cats</Radio.Button>
		</Radio>
	),
};

export const Invalid: Story = {
	render: () => (
		<form>
			<Radio
				label="Favorite pet"
				name="pet"
				isRequired
				validationBehavior="native"
				errorMessage="Please select one of these options."
			>
				<Radio.Button value="dogs">Dogs</Radio.Button>
				<Radio.Button value="cats">Cats</Radio.Button>
			</Radio>
			<Button
				type="submit"
				className="mt-4"
				size="xs"
			>
				submit
			</Button>
		</form>
	),
};
