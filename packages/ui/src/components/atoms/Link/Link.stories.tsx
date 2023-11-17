import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
	component: Link,
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
	render: () => (
		<Link
			href="https://google.com/"
			target="_blank"
			rel="noopener noreferrer"
		>
			Hello world
		</Link>
	),
};
