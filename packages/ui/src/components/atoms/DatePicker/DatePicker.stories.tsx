import { getLocalTimeZone, today } from "@internationalized/date";
import type { Meta, StoryObj } from "@storybook/react";

import { DatePicker } from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
	component: DatePicker,
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
	render: () => (
		<DatePicker
			label="Hello World"
			maxValue={today(getLocalTimeZone())}
		/>
	),
};
