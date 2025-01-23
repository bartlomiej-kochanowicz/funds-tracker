import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "components/text";

const meta: Meta<typeof Text> = {
	component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

const Default: Story = {
	render: () => <Text>Hello world</Text>,
};

export { Default };
