import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
	component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
	render: () => <Switch />,
};
