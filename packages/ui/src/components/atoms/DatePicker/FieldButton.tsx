import { useRef } from "react";
import { type AriaButtonProps, useButton } from "react-aria";

interface FieldButtonProps extends AriaButtonProps {
	isPressed?: boolean;
}

export const FieldButton = (props: FieldButtonProps) => {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps, isPressed } = useButton(props, ref);

	const { children, isPressed: isPressedFromProps } = props;
	return (
		<button
			{...buttonProps}
			type="button"
			ref={ref}
			className={`-ml-px rounded-r-md border px-2 outline-none transition-colors group-focus-within:border-violet-600 group-focus-within:group-hover:border-violet-600 ${
				isPressed || isPressedFromProps
					? "border-gray-400 bg-gray-200"
					: "border-gray-300 bg-gray-50 group-hover:border-gray-400"
			}`}
		>
			{children}
		</button>
	);
};
