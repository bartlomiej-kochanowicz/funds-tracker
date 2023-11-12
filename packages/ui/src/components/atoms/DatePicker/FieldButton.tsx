import clsx from "clsx";
import { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface FieldButtonProps extends AriaButtonProps {
	isPressed?: boolean;
}

export const FieldButton = (props: FieldButtonProps) => {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps, isPressed } = useButton(props, ref);

	const { children, isPressed: isPressedFromProps, isDisabled } = props;

	return (
		<button
			{...buttonProps}
			type="button"
			ref={ref}
			className={clsx(
				"-ml-px rounded-r-md border border-l-0 px-2 outline-none transition-colors group-focus-within:border-blue-500 group-focus-within:group-hover:border-blue-600",
				isPressed || isPressedFromProps
					? "border-gray-300 bg-gray-200 dark:bg-neutral-700"
					: "border-gray-300 bg-gray-100 group-hover:border-gray-400 dark:bg-neutral-600",
				isDisabled && "cursor-not-allowed",
			)}
		>
			{children}
		</button>
	);
};
