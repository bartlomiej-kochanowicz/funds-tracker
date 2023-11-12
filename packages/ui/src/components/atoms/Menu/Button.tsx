import { forwardRef, type RefObject } from "react";
import { type AriaButtonProps, mergeProps, useButton, useFocusRing } from "react-aria";

interface ButtonProps extends AriaButtonProps {
	isPressed: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const { buttonProps, isPressed } = useButton(props, ref as RefObject<HTMLButtonElement>);
	const { focusProps, isFocusVisible } = useFocusRing();

	let bg = "bg-blue-500";
	if (props.isDisabled) {
		bg = "bg-gray-400";
	} else if (isPressed || props.isPressed) {
		bg = "bg-blue-600";
	}

	const focus = isFocusVisible ? "ring ring-offset-2 ring-blue-400" : "";

	return (
		<button
			{...mergeProps(buttonProps, focusProps)}
			type="button"
			ref={ref}
			className={`${focus} cursor-default rounded px-4 py-2 text-sm font-semibold text-white transition focus:outline-none ${bg}`}
		>
			{props.children}
		</button>
	);
});
