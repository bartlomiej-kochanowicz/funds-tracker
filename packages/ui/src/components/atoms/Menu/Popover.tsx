import { ReactNode, useRef } from "react";
import { type AriaPopoverProps, DismissButton, Overlay, usePopover } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	children: ReactNode;
	state: OverlayTriggerState;
}

export function Popover(props: PopoverProps) {
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
				className="z-10 mt-2 rounded-md border border-gray-300 bg-white shadow-lg"
			>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
}
