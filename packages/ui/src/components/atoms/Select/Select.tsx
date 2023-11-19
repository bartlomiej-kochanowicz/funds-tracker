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

import { Popover } from "../Popover";
import { ListBox } from "./ListBox";

export { Item } from "react-stately";

export function Select<T extends object>(props: AriaSelectProps<T>) {
	const state = useSelectState(props);

	const ref = useRef<HTMLButtonElement>(null);
	const { labelProps, triggerProps, valueProps, menuProps } = useSelect(props, state, ref);

	const { buttonProps } = useButton(triggerProps, ref);

	const { focusProps, isFocusVisible } = useFocusRing();

	const { label, name } = props;

	return (
		<div className="relative mt-4 inline-flex w-52 flex-col">
			<div
				{...labelProps}
				className="block cursor-default text-left text-sm font-medium text-gray-700"
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
				className={`relative inline-flex cursor-default flex-row items-center justify-between overflow-hidden rounded-md border-2 p-1 py-1 pl-3 shadow-sm outline-none ${
					isFocusVisible ? "border-pink-500" : "border-gray-300"
				} ${state.isOpen ? "bg-gray-100" : "bg-white"}`}
			>
				<span
					{...valueProps}
					className={`text-md ${state.selectedItem ? "text-gray-800" : "text-gray-500"}`}
				>
					{state.selectedItem ? state.selectedItem.rendered : "Select an option"}
				</span>
				<ChevronsUpDown
					className={`h-5 w-5 ${isFocusVisible ? "text-pink-500" : "text-gray-500"}`}
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
