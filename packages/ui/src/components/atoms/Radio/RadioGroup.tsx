import { createContext, ReactNode } from "react";
import { useRadioGroup } from "react-aria";
import {
	RadioGroupProps as RadioGroupStatelyProps,
	RadioGroupState,
	useRadioGroupState,
} from "react-stately";

import { Text } from "../Text";

export const RadioContext = createContext<RadioGroupState | null>(null);

interface RadioGroupProps extends RadioGroupStatelyProps {
	children?: ReactNode;
	errorMessage?: ReactNode;
}

export const RadioGroup = (props: RadioGroupProps) => {
	const { children, label, description, errorMessage } = props;
	const state = useRadioGroupState(props);
	const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } = useRadioGroup(
		props,
		state,
	);

	return (
		<div {...radioGroupProps}>
			<span {...labelProps}>{label}</span>
			<RadioContext.Provider value={state}>{children}</RadioContext.Provider>
			{description && (
				<Text
					{...descriptionProps}
					className="text-xs"
				>
					{description}
				</Text>
			)}

			{errorMessage && state.isInvalid && (
				<div
					{...errorMessageProps}
					className="text-xs text-red-500"
				>
					{errorMessage}
				</div>
			)}
		</div>
	);
};
