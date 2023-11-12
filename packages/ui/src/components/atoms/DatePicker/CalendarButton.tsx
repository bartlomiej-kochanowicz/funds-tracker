import clsx from "clsx";
import { useRef } from "react";
import { type AriaButtonProps, mergeProps, useButton, useFocusRing } from "react-aria";

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
				!isDisabled &&
					"hover:bg-gray-200 active:bg-gray-200 dark:hover:bg-gray-300 dark:hover:text-gray-900",
				isFocusVisible && "ring-2 ring-blue-300",
			)}
		>
			{children}
		</button>
	);
};
