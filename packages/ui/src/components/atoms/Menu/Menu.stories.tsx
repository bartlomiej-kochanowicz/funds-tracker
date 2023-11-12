import type { Meta, StoryObj } from "@storybook/react";
import { Item, Section } from "react-stately";

import { MenuButton } from "./MenuButton";

const meta: Meta<typeof MenuButton> = {
	component: MenuButton,
};

export default meta;
type Story = StoryObj<typeof MenuButton>;

export const Default: Story = {
	render: () => (
		<MenuButton
			label="Actions"
			onAction={key => console.log(key)}
		>
			<Section>
				<Item key="edit">Edit…</Item>
				<Item key="duplicate">Duplicate</Item>
			</Section>
			<Section>
				<Item key="move">Move…</Item>
				<Item key="rename">Rename…</Item>
			</Section>
			<Section>
				<Item key="archive">Archive</Item>
				<Item key="delete">Delete…</Item>
			</Section>
		</MenuButton>
	),
};
