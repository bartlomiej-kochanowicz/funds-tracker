import clsx from "clsx";
import { ReactNode, useContext, useRef } from "react";
import { AriaRadioProps, useFocusRing, useRadio, VisuallyHidden } from "react-aria";

import { Text } from "../Text";
import { RadioContext } from "./RadioGroup";

interface RadioButtonProps extends AriaRadioProps {
	children?: ReactNode;
}

export const RadioButton = (props: RadioButtonProps) => {
	const { children } = props;
	const state = useContext(RadioContext);
	const ref = useRef<HTMLInputElement>(null);

	if (!state) {
		throw new Error("RadioButton must be used within a Radio component");
	}

	const { inputProps, isSelected, isDisabled } = useRadio(props, state, ref);
	const { isFocusVisible, focusProps } = useFocusRing();
	const strokeWidth = isSelected ? 4 : 1;

	return (
		<label
			className={clsx("group flex items-center", isDisabled && "cursor-not-allowed opacity-50")}
		>
			<VisuallyHidden>
				<input
					{...inputProps}
					{...focusProps}
					ref={ref}
				/>
			</VisuallyHidden>
			<svg
				width={24}
				height={24}
				aria-hidden="true"
				className="mr-1"
			>
				<circle
					cx={12}
					cy={12}
					r={8 - strokeWidth / 2}
					className={clsx(
						"fill-white transition duration-150 ease-in-out",
						isSelected
							? "stroke-blue-500"
							: "stroke-gray-300 dark:fill-neutral-700 dark:stroke-gray-600",
						!isDisabled && !isSelected && "group-hover:stroke-gray-400",
					)}
					strokeWidth={strokeWidth}
				/>
				{isFocusVisible && (
					<circle
						cx={12}
						cy={12}
						r={11}
						className="fill-transparent stroke-blue-500"
						strokeWidth={2}
					/>
				)}
			</svg>
			<Text>{children}</Text>
		</label>
	);
};
