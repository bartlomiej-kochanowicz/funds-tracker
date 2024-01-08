import clsx from "clsx";
import { type ReactNode, RefObject, useRef } from "react";
import { type AriaPopoverProps, DismissButton, Overlay, usePopover } from "react-aria";
import { type OverlayTriggerState } from "react-stately";

interface PopoverProps extends Omit<AriaPopoverProps, "popoverRef"> {
	state: OverlayTriggerState;
	children?: ReactNode;
	className?: string;
	popoverRef?: RefObject<HTMLDivElement>;
}

export const Popover = ({ className, ...props }: PopoverProps) => {
	const ref = useRef<HTMLDivElement>(null);
	const { state, children, popoverRef, isNonModal } = props;

	const mergedRefs = popoverRef || ref;

	const { popoverProps, underlayProps } = usePopover(
		{
			...props,
			popoverRef: mergedRefs,
		},
		state,
	);

	return (
		<Overlay>
			{!isNonModal && (
				<div
					{...underlayProps}
					className="fixed inset-0"
				/>
			)}
			<div
				{...popoverProps}
				ref={mergedRefs}
				className={clsx(
					className,
					"absolute top-full z-10 mt-2 min-w-[200px] overflow-auto rounded-md border border-gray-300 bg-white py-1 shadow-lg dark:border-neutral-700 dark:bg-zinc-800",
				)}
			>
				{!isNonModal && <DismissButton onDismiss={state.close} />}
				{children}
				<DismissButton onDismiss={state.close} />
			</div>
		</Overlay>
	);
};
