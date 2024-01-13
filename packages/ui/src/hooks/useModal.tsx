import { AnimatePresence } from "framer-motion";
import { useOverlayTriggerState } from "react-stately";

import { Modal } from "../components/Modal/Modal";

export interface ModalProps {
	close: () => void;
}

interface UseModalArgs {
	children: ({ close }: ModalProps) => JSX.Element;
	title: string;
}

export const useModal = ({ children, ...props }: UseModalArgs) => {
	const state = useOverlayTriggerState({});

	const triggerProps = {
		onPress: state.open,
	};

	return {
		triggerProps,
		Modal: () => (
			<AnimatePresence>
				{state.isOpen && <Modal state={state}>{children({ close: state.close, ...props })}</Modal>}
			</AnimatePresence>
		),
	};
};
