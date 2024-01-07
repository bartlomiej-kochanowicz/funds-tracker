import type { Meta, StoryObj } from "@storybook/react";
import { Landmark } from "lucide-react";
import { withRouter } from "storybook-addon-react-router-v6";

import { Tile } from "./Tile";

const meta: Meta<typeof Tile> = {
	component: Tile,
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const Default: Story = {
	render: () => (
		<Tile title="Hello world">
			<Landmark />
		</Tile>
	),
};

export const Link: Story = {
	render: () => (
		<Tile
			title="Hello world"
			to="/"
		>
			<Landmark />
		</Tile>
	),
	decorators: [withRouter],
};
