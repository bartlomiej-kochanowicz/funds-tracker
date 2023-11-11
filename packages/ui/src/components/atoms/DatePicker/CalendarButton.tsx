import clsx from "clsx";
import { useRef } from "react";
import { AriaButtonProps, mergeProps, useButton, useFocusRing } from "react-aria";

interface CalendarButtonProps extends AriaButtonProps {}

export const CalendarButton = (props: CalendarButtonProps) => {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	const { focusProps, isFocusVisible } = useFocusRing();

	const { isDisabled, children } = props;

	return (
		<button
			{...mergeProps(buttonProps, focusProps)}
			ref={ref}
			type="button"
			className={clsx(
				"rounded-md p-1 outline-none",
				isDisabled && "text-gray-400",
				!isDisabled && "hover:bg-blue-100 active:bg-blue-200",
				isFocusVisible && "ring-2 ring-blue-300 ring-offset-2",
			)}
		>
			{children}
		</button>
	);
};
