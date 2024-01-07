import clsx from "clsx";
import { forwardRef, ReactNode, useRef } from "react";
import { type AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";
import { ChangeHandler } from "react-hook-form";

import { mergeRefs } from "../../helpers/mergeRefs";
import { Text } from "../Text";

interface InputProps extends Omit<AriaTextFieldProps, "onChange"> {
	className?: string;
	errorMessage?: ReactNode;
	onChange?: ChangeHandler;
}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { label, className, onChange } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	const { labelProps, inputProps, descriptionProps, errorMessageProps, isInvalid } = useTextField(
		{
			...props,
			onChange: onChange && (value => onChange({ target: { value } })),
		},
		inputRef,
	);

	const { description, isDisabled, errorMessage } = props;

	return (
		<div className={clsx(className, "group", !description && !isInvalid && "mb-4")}>
			{label && (
				<label
					{...labelProps}
					className="mb-2 block text-sm text-gray-900 dark:text-white"
				>
					{label}
				</label>
			)}
			<input
				{...inputProps}
				className={clsx(
					"block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:group-hover:border-blue-500 dark:border-neutral-700 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500",
					isDisabled && "cursor-not-allowed opacity-50",
					!isDisabled && "group-hover:border-gray-400",
					isInvalid &&
						"border-red-500 focus:border-red-500 group-hover:border-red-500 focus:group-hover:border-red-500 dark:border-red-500 dark:focus:border-red-500",
				)}
				ref={mergeRefs([inputRef, ref])}
			/>
			{description && !isInvalid && (
				<Text
					{...descriptionProps}
					className="mb-0.5 text-xs"
				>
					{description}
				</Text>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className="mb-0.5 text-xs text-red-500"
				>
					{errorMessage}
				</div>
			)}
		</div>
	);
});
