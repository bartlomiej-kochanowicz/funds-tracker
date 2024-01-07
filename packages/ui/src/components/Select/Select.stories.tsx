import type { Meta, StoryObj } from "@storybook/react";

import { Select } from ".";

const meta: Meta<typeof Select> = {
	component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
	render: () => (
		<Select label="Favorite Animal">
			<Select.Item key="red panda">Red Panda</Select.Item>
			<Select.Item key="cat">Cat</Select.Item>
			<Select.Item key="dog">Dog</Select.Item>
			<Select.Item key="aardvark">Aardvark</Select.Item>
			<Select.Item key="kangaroo">Kangaroo</Select.Item>
			<Select.Item key="snake">Snake</Select.Item>
		</Select>
	),
};
