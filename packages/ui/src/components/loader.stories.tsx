import type { Meta, StoryObj } from "@storybook/react";

import { Loader } from "@/src/components/loader";

const meta: Meta<typeof Loader> = {
	component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

const Default: Story = {
	render: () => <Loader />,
};

export { Default };
