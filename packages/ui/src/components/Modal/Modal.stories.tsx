import type { Meta, StoryObj } from "@storybook/react";
import { Fragment } from "react";

import { Button } from "../Button";
import { Input } from "../Input";
import { Modal } from "./Modal";
import { useModal } from "./useModal";

const meta: Meta<typeof Modal> = {
	component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
	render: () => {
		const { Modal: ModalHook, triggerProps } = useModal({
			children: close => (
				<Fragment>
					<Button onPress={close}>Close</Button>
					<Input />
				</Fragment>
			),
		});

		return (
			<Fragment>
				<Button {...triggerProps}>Open modal</Button>
				<ModalHook />
			</Fragment>
		);
	},
};
