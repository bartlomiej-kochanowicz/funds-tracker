import { useNumberField } from "@react-aria/numberfield";
import { NumberFieldStateOptions, useNumberFieldState } from "@react-stately/numberfield";
import { ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { mergeRefs } from "../../helpers/mergeRefs";
import { Input } from "../Input";

type NumberInputProps = NumberFieldStateOptions & ComponentPropsWithoutRef<"input">;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	({ locale, ...props }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);

		const state = useNumberFieldState({ ...props, locale });
		const { inputProps } = useNumberField(props, state, inputRef);

		return (
			<Input
				{...inputProps}
				ref={mergeRefs([inputRef, ref])}
			/>
		);
	},
);
