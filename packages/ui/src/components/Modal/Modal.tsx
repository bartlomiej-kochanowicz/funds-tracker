import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";
import { Overlay, useDialog, useModalOverlay } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

import { H3 } from "../Heading";
import { Backdrop } from "./Backdrop";

const effect = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			type: "spring",
			stiffness: 600,
			damping: 30,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

interface ModalProps {
	state: OverlayTriggerState;
	children: ReactNode;
	title?: string;
	className?: string;
}

export const Modal = ({ state, children, className, title, ...props }: ModalProps) => {
	const ref = useRef(null);
	const { modalProps, underlayProps } = useModalOverlay(props, state, ref);

	const { dialogProps, titleProps } = useDialog(props, ref);

	return (
		<Overlay>
			<Backdrop
				onClick={state.close}
				{...underlayProps}
			>
				<motion.div
					{...(modalProps as any)}
					{...dialogProps}
					ref={ref}
					className={clsx(
						"relative w-full max-w-lg outline-none sm:w-auto",
						className || "m-4 rounded-xl bg-slate-50 p-5 shadow-xl dark:bg-neutral-800",
					)}
					variants={effect}
					initial="hidden"
					animate="visible"
					exit="exit"
					onClick={e => e.stopPropagation()}
				>
					{title && <H3 {...titleProps}>{title}</H3>}
					<hr className="mb-4" />
					{children}
				</motion.div>
			</Backdrop>
		</Overlay>
	);
};
