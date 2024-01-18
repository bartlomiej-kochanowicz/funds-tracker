import clsx from "clsx";
import { useRef } from "react";
import { AriaSwitchProps, useFocusRing, useSwitch, VisuallyHidden } from "react-aria";
import { useToggleState } from "react-stately";

import { Text } from "../Text";

interface SwitchProps extends AriaSwitchProps {}

export const Switch = (props: SwitchProps) => {
	const state = useToggleState(props);
	const ref = useRef(null);
	const { inputProps, isSelected } = useSwitch(props, state, ref);
	const { isFocusVisible, focusProps } = useFocusRing();

	const { isDisabled, children } = props;

	return (
		<label
			className={clsx(
				"relative inline-flex cursor-pointer items-center",
				isDisabled && "!cursor-not-allowed opacity-50",
			)}
		>
			<VisuallyHidden>
				<input
					{...inputProps}
					{...focusProps}
					ref={ref}
				/>
			</VisuallyHidden>
			<div
				className={clsx(
					"peer h-6 w-11 rounded-full  after:absolute after:start-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] dark:border-neutral-700",
					isSelected && "bg-blue-500 after:translate-x-full after:border-white",
					!isSelected && "bg-gray-200 dark:bg-neutral-700",
					isFocusVisible && "outline-none ring-4 ring-blue-300 dark:ring-blue-800",
				)}
			/>
			{children && <Text className="ml-1">{children}</Text>}
		</label>
	);
};
