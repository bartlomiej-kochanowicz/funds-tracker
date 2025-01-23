import type { Meta, StoryObj } from "@storybook/react";
import { Tile } from "components/tile";
import { Landmark } from "lucide-react";
import { withRouter } from "storybook-addon-react-router-v6";

const meta: Meta<typeof Tile> = {
	component: Tile,
};

export default meta;
type Story = StoryObj<typeof Tile>;

const Default: Story = {
	render: () => (
		<Tile title="Hello world">
			<Landmark />
		</Tile>
	),
};

const Link: Story = {
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

export { Default, Link };
