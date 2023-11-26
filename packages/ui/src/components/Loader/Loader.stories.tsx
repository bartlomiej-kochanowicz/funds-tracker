import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
	component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Sm: Story = {
	render: () => <Loader size="sm" />,
};

export const Md: Story = {
	render: () => <Loader size="md" />,
};
export const Lg: Story = {
	render: () => <Loader size="lg" />,
};
