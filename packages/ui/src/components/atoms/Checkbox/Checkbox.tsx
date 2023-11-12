import clsx from "clsx";
import { useRef } from "react";
import {
	AriaCheckboxProps,
	mergeProps,
	useCheckbox,
	useFocusRing,
	VisuallyHidden,
} from "react-aria";
import { useToggleState } from "react-stately";

export function Checkbox(props: AriaCheckboxProps) {
	const { isDisabled, children } = props;

	const state = useToggleState(props);
	const ref = useRef<HTMLInputElement>(null);
	const { inputProps } = useCheckbox(props, state, ref);
	const { focusProps, isFocusVisible } = useFocusRing();

	const checkboxClassName = clsx(
		"text-white border-2 rounded w-5 h-5 flex flex-shrink-0 justify-center items-center mr-2 transition ease-in-out duration-150 cursor-pointer",
		state.isSelected ? "bg-blue-500 group-active:bg-blue-500" : "bg-white",
		isFocusVisible && "shadow-outline",
		isDisabled && "border-gray-300 cursor-not-allowed",
		!isDisabled && (isFocusVisible || state.isSelected)
			? "border-blue-500 group-active:border-indigo-600"
			: "border-gray-500 group-active:border-gray-600",
	);

	const labelClassName = clsx(
		"select-none cursor-pointer",
		isDisabled ? "text-gray-400 cursor-not-allowed" : "text-gray-700 group-active:text-gray-800",
	);

	return (
		<label className="group flex items-center">
			<VisuallyHidden>
				<input
					{...mergeProps(inputProps, focusProps)}
					ref={ref}
				/>
			</VisuallyHidden>
			<div
				className={checkboxClassName}
				aria-hidden="true"
			>
				<svg
					className="h-3 w-3 stroke-current"
					viewBox="0 0 18 18"
				>
					<polyline
						points="1 9 7 14 15 4"
						fill="none"
						strokeWidth={3}
						strokeDasharray={22}
						strokeDashoffset={state.isSelected ? 44 : 66}
						style={{
							transition: "all 400ms",
						}}
					/>
				</svg>
			</div>
			<span className={labelClassName}>{children}</span>
		</label>
	);
}
