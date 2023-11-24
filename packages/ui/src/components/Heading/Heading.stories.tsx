import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";

import { Heading } from "./Heading";

const meta: Meta<typeof Heading.H1> = {
	component: Heading.H1,
};

export default meta;
type Story = StoryObj<typeof Heading.H1>;

export const Default: Story = {
	render: () => (
		<Fragment>
			<Heading.H1>Hello world</Heading.H1>
			<Heading.H2>Hello world</Heading.H2>
			<Heading.H3>Hello world</Heading.H3>
			<Heading.H4>Hello world</Heading.H4>
			<Heading.H5>Hello world</Heading.H5>
		</Fragment>
	),
};
