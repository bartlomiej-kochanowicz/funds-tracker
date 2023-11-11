import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	component: Button,
	decorators: [
		Story => (
			<div className="flex w-min flex-col gap-4">
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Blue: Story = {
	render: () => (
		<Fragment>
			<Button
				color="blue"
				className="whitespace-nowrap"
			>
				Hello world
			</Button>
			<Button
				color="blue"
				className="whitespace-nowrap"
				isDisabled
			>
				Hello world
			</Button>
		</Fragment>
	),
};

export const Black: Story = {
	render: () => (
		<Fragment>
			<Button
				color="black"
				className="whitespace-nowrap"
			>
				Hello world
			</Button>
			<Button
				color="black"
				className="whitespace-nowrap"
				isDisabled
			>
				Hello world
			</Button>
		</Fragment>
	),
};

export const Gray: Story = {
	render: () => (
		<Fragment>
			<Button
				color="gray"
				className="whitespace-nowrap"
			>
				Hello world
			</Button>
			<Button
				color="gray"
				className="whitespace-nowrap"
				isDisabled
			>
				Hello world
			</Button>
		</Fragment>
	),
};
