import clsx from "clsx";
import { ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

import { Backdrop } from "./Backdrop";

interface ModalProps extends AriaModalOverlayProps {
	state: OverlayTriggerState;
	children: ReactNode;
}

export const Modal = (props: ModalProps) => {
	const modalRef = useRef(null);

	const { state, children } = props;

	const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef);

	return (
		<Overlay>
			<Backdrop
				onClick={state.close}
				{...underlayProps}
			>
				<div
					{...modalProps}
					ref={modalRef}
					className={clsx(
						"relative m-4 w-full max-w-lg rounded-xl bg-slate-50 p-5 shadow-xl outline-none sm:w-auto",
						"dark:bg-neutral-800",
					)}
				>
					{children}
				</div>
			</Backdrop>
		</Overlay>
	);
};
