import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../Button";
import { Menu } from ".";

const meta: Meta<typeof Menu> = {
	component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
	render: () => (
		<Menu
			triggerElement={(props, ref, isOpen) => (
				<Button
					{...props}
					ref={ref}
				>
					<span className="mr-2">Actions</span>
					<span>{isOpen ? "▲" : "▼"}</span>
				</Button>
			)}
		>
			<Menu.Section>
				<Menu.Item key="edit">Edit…</Menu.Item>
				<Menu.Item key="duplicate">Duplicate</Menu.Item>
			</Menu.Section>
			<Menu.Section>
				<Menu.Item key="move">Move…</Menu.Item>
				<Menu.Item key="rename">Rename…</Menu.Item>
			</Menu.Section>
			<Menu.Section>
				<Menu.Item key="archive">Archive</Menu.Item>
				<Menu.Item key="delete">Delete…</Menu.Item>
			</Menu.Section>
		</Menu>
	),
};
