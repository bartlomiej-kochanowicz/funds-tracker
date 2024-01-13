import clsx from "clsx";
import { MouseEvent, ReactNode, useRef } from "react";
import { AriaModalOverlayProps, Overlay, useModalOverlay } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

import { Backdrop } from "./Backdrop";

interface ModalProps extends AriaModalOverlayProps {
	state: OverlayTriggerState;
	children: ReactNode;
}

export const Modal = (props: ModalProps) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const backdropRef = useRef<HTMLDivElement>(null);

	const { state, children } = props;

	const { modalProps, underlayProps } = useModalOverlay(props, state, modalRef);

	const handleBackbropClick = (e: MouseEvent) => {
		if (e.target === backdropRef.current) {
			state.close();
		}
	};

	return (
		<Overlay>
			<Backdrop
				ref={backdropRef}
				onClick={handleBackbropClick}
				{...underlayProps}
			>
				<div
					{...modalProps}
					ref={modalRef}
					className={clsx(
						"relative m-4 w-full max-w-lg rounded-xl bg-slate-50 p-5 shadow-xl sm:w-auto",
						"dark:bg-neutral-800",
					)}
				>
					{children}
				</div>
			</Backdrop>
		</Overlay>
	);
};
