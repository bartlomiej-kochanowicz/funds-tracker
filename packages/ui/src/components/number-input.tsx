import { useNumberField } from "@react-aria/numberfield";
import { NumberFieldStateOptions, useNumberFieldState } from "@react-stately/numberfield";
import { Input } from "components/input";
import { mergeRefs } from "lib/merge-refs";
import { ComponentPropsWithoutRef, forwardRef, useRef } from "react";

type NumberInputProps = NumberFieldStateOptions & ComponentPropsWithoutRef<"input">;

const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(({ locale, ...props }, ref) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const state = useNumberFieldState({ ...props, locale });
	const { inputProps } = useNumberField(props, state, inputRef);

	return (
		<Input
			{...inputProps}
			ref={mergeRefs([inputRef, ref])}
		/>
	);
});

export { NumberInput };
