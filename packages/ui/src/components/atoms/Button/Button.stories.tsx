import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
	component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Blue: Story = {
	render: () => <Button color="blue">Hello world</Button>,
};

export const Black: Story = {
	render: () => <Button color="black">Hello world</Button>,
};

export const Gray: Story = {
	render: () => <Button color="gray">Hello world</Button>,
};
