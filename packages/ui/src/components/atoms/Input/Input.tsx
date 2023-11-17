import clsx from "clsx";
import { useRef } from "react";
import { type AriaTextFieldProps } from "react-aria";
import { useTextField } from "react-aria";

export const Input = (props: AriaTextFieldProps) => {
	const { label } = props;
	const ref = useRef<HTMLInputElement>(null);

	const {
		labelProps,
		inputProps,
		descriptionProps,
		errorMessageProps,
		isInvalid,
		validationErrors,
	} = useTextField(props, ref);

	const { description, isDisabled } = props;

	return (
		<div className="group">
			<label
				{...labelProps}
				className="mb-2 block text-sm text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<input
				{...inputProps}
				className={clsx(
					"block w-full rounded-xl border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 outline-none focus:border-blue-500 focus:group-hover:border-blue-500 dark:border-gray-600 dark:bg-neutral-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500",
					isDisabled && "cursor-not-allowed opacity-50",
					!isDisabled && "group-hover:border-gray-400",
				)}
				ref={ref}
			/>
			{description && (
				<div
					{...descriptionProps}
					style={{ fontSize: 12 }}
				>
					{description}
				</div>
			)}
			{isInvalid && (
				<div
					{...errorMessageProps}
					className="text-sm text-red-500"
				>
					{validationErrors.join(" ")}
				</div>
			)}
		</div>
	);
};
