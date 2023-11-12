import { type ReactNode, useRef } from "react";
import { AriaPopoverProps, DismissButton, Overlay, usePopover } from "react-aria";
import { type DatePickerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	state: DatePickerState;
	children?: ReactNode;
}

export const Popover = (props: PopoverProps) => {
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
				className="absolute top-full z-10 mt-2 rounded-md border-2 border-gray-300 bg-white p-4 shadow-lg dark:border-gray-600 dark:bg-neutral-900"
			>
				<DismissButton onDismiss={state.close} />
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
};
