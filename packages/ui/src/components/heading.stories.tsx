import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";

import { H1, H2, H3, H4, H5 } from "@/src/components/heading";

const meta: Meta<typeof H1> = {
	component: H1,
};

export default meta;
type Story = StoryObj<typeof H1>;

export const Default: Story = {
	render: () => (
		<Fragment>
			<H1>Hello world</H1>
			<H2>Hello world</H2>
			<H3>Hello world</H3>
			<H4>Hello world</H4>
			<H5>Hello world</H5>
		</Fragment>
	),
};
