import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import { Modal } from "./Modal";

interface UseModalArgs {
	children: (close: () => void) => JSX.Element;
	title?: string;
}

export const useModal = ({ children, title, ...props }: UseModalArgs) => {
	const state = useOverlayTriggerState(props);
	const { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state);

	return {
		triggerProps,
		Modal: () => (
			<AnimatePresence>
				{state.isOpen && (
					<Modal
						state={state}
						title={title}
					>
						{cloneElement(children(state.close), overlayProps)}
					</Modal>
				)}
			</AnimatePresence>
		),
	};
};
