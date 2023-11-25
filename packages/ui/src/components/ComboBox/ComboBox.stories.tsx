import type { Meta, StoryObj } from "@storybook/react";

import { ComboBox } from ".";

const meta: Meta<typeof ComboBox> = {
	component: ComboBox,
};

export default meta;
type Story = StoryObj<typeof ComboBox>;

export const Default: Story = {
	render: () => (
		<ComboBox label="Favorite Animal">
			<ComboBox.Item key="red panda">Red Panda</ComboBox.Item>
			<ComboBox.Item key="cat">Cat</ComboBox.Item>
			<ComboBox.Item key="dog">Dog</ComboBox.Item>
			<ComboBox.Item key="aardvark">Aardvark</ComboBox.Item>
			<ComboBox.Item key="kangaroo">Kangaroo</ComboBox.Item>
			<ComboBox.Item key="snake">Snake</ComboBox.Item>
		</ComboBox>
	),
};
