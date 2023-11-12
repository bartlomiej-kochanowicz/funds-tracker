import clsx from "clsx";
import { type ReactNode, useRef } from "react";
import { type AriaPopoverProps, DismissButton, Overlay, usePopover } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	state: OverlayTriggerState;
	children?: ReactNode;
	className?: string;
}

export const Popover = ({ className, ...props }: PopoverProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { state, children } = props;

	const { popoverProps, underlayProps } = usePopover(
		{
			...props,
			popoverRef: ref,
		},
		state,
	);

	return (
		<Overlay>
			<div
				{...underlayProps}
				className="fixed inset-0"
			/>
			<div
				{...popoverProps}
				ref={ref}
				className={clsx(
					className,
					"absolute top-full z-10 mt-2 rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-neutral-900",
				)}
			>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
};
