import { useNumberField } from "@react-aria/numberfield";
import { NumberFieldStateOptions, useNumberFieldState } from "@react-stately/numberfield";
import { ComponentPropsWithoutRef, forwardRef, useRef } from "react";

import { mergeRefs } from "../../helpers/mergeRefs";
import { Input } from "../Input";

type NumberInputProps = {
	locale: string;
	value?: number | null;
} & Omit<NumberFieldStateOptions, "value"> &
	Omit<ComponentPropsWithoutRef<"input">, "value">;

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
	({ locale, value, ...rest }, ref) => {
		const inputRef = useRef<HTMLInputElement>(null);
		const props = {
			...rest,
			value,
		} as NumberFieldStateOptions & ComponentPropsWithoutRef<"input">;

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
