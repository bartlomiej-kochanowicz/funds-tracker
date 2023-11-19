import { ReactNode, useContext, useRef } from "react";
import { AriaRadioProps, useRadio } from "react-aria";

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

	const { inputProps } = useRadio(props, state, ref);

	return (
		<label className="block">
			<input
				{...inputProps}
				ref={ref}
			/>
			{children}
		</label>
	);
};
