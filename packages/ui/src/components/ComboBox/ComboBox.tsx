import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";
import { AriaComboBoxProps, useButton, useComboBox, useFilter } from "react-aria";
import { useComboBoxState } from "react-stately";

import { ListBox } from "../ListBox";
import { Popover } from "../Popover";

export { Item, Section } from "react-stately";

export const ComboBox = <T extends object>(props: AriaComboBoxProps<T>) => {
	const { contains } = useFilter({ sensitivity: "base" });
	const state = useComboBoxState({ ...props, defaultFilter: contains });

	const buttonRef = useRef(null);
	const inputRef = useRef(null);
	const listBoxRef = useRef(null);
	const popoverRef = useRef(null);

	const {
		buttonProps: triggerProps,
		inputProps,
		listBoxProps,
		labelProps,
	} = useComboBox(
		{
			...props,
			inputRef,
			buttonRef,
			listBoxRef,
			popoverRef,
		},
		state,
	);

	const { buttonProps } = useButton(triggerProps, buttonRef);

	const { label } = props;

	return (
		<div className="relative inline-flex w-52 flex-col">
			<label
				{...labelProps}
				className="block text-left text-sm font-medium text-gray-700"
			>
				{label}
			</label>
			<div
				className={clsx(
					"relative flex flex-row overflow-hidden rounded-md border-2 shadow-sm",
					state.isFocused ? "border-pink-500" : "border-gray-300",
				)}
			>
				<input
					{...inputProps}
					ref={inputRef}
					className="w-full px-3 py-1 outline-none"
				/>
				<button
					{...buttonProps}
					ref={buttonRef}
					type="button"
					className={clsx(
						"cursor-default border-l-2 bg-gray-100 px-1",
						state.isFocused ? "border-pink-500 text-pink-600" : "border-gray-300 text-gray-500",
					)}
				>
					<ChevronDownIcon
						className="h-5 w-5"
						aria-hidden="true"
					/>
				</button>
			</div>
			{state.isOpen && (
				<Popover
					popoverRef={popoverRef}
					triggerRef={inputRef}
					state={state}
					placement="bottom start"
				>
					<ListBox
						{...listBoxProps}
						listBoxRef={listBoxRef}
						state={state}
					/>
				</Popover>
			)}
		</div>
	);
};
