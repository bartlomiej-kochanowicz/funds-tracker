import { AnimatePresence } from "framer-motion";
import { cloneElement } from "react";
import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";

import { Modal } from "./Modal";

export const useModal = ({ children, ...props }) => {
	const state = useOverlayTriggerState(props);
	const { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state);

	return {
		triggerProps,
		Modal: () => (
			<AnimatePresence>
				{state.isOpen && (
					<Modal state={state}>{cloneElement(children(state.close), overlayProps)}</Modal>
				)}
			</AnimatePresence>
		),
	};
};
