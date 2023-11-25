import clsx from "clsx";
import { ChevronsUpDown } from "lucide-react";
import { useRef } from "react";
import {
	type AriaSelectProps,
	HiddenSelect,
	mergeProps,
	useButton,
	useFocusRing,
	useSelect,
} from "react-aria";
import { useSelectState } from "react-stately";

import { ListBox } from "../ListBox";
import { Popover } from "../Popover";

export { Item } from "react-stately";

export function Select<T extends object>(props: AriaSelectProps<T>) {
	const state = useSelectState(props);

	const ref = useRef<HTMLButtonElement>(null);
	const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

	const { buttonProps } = useButton(triggerProps, ref);

	const { focusProps, isFocusVisible } = useFocusRing();

	const { label, name, isDisabled } = props;

	return (
		<div className="group">
			<div
				{...labelProps}
				className="mb-2 block text-sm text-gray-900 dark:text-white"
			>
				{label}
			</div>
			<HiddenSelect
				state={state}
				triggerRef={ref}
				label={label}
				name={name}
			/>
			<button
				{...mergeProps(buttonProps, focusProps)}
				type="button"
				ref={ref}
				className={clsx(
					"flex w-full items-center justify-between rounded-xl border bg-gray-50 p-2.5 text-sm outline-none dark:border-gray-600 dark:bg-neutral-700",
					isFocusVisible && "border-blue-500 group-hover:border-blue-500 dark:border-blue-500",
					!isFocusVisible && "border-gray-300",
					isDisabled && "cursor-not-allowed opacity-50",
					!isDisabled && "group-hover:border-gray-400",
				)}
			>
				<span
					{...valueProps}
					className={clsx(
						"text-md",
						state.selectedItem ? "text-gray-900 dark:text-white" : "text-gray-400",
					)}
				>
					{state.selectedItem ? state.selectedItem.rendered : "Select an option"}
				</span>
				<ChevronsUpDown
					className={clsx("h-5 w-5", isFocusVisible ? "text-blue-500" : "text-gray-400")}
				/>
			</button>
			{state.isOpen && (
				<Popover
					state={state}
					triggerRef={ref}
					placement="bottom start"
					className="w-52"
				>
					<ListBox
						{...menuProps}
						state={state}
					/>
				</Popover>
			)}
		</div>
	);
}
