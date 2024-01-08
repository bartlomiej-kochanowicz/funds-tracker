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

	const { label, isDisabled } = props;

	return (
		<div className="group">
			<label
				{...labelProps}
				className="mb-2 block text-sm text-gray-900 dark:text-white"
			>
				{label}
			</label>
			<div
				className={clsx(
					"relative flex w-full overflow-hidden rounded-xl border border-gray-300 bg-gray-50  text-sm text-gray-900 outline-none group-hover:border-blue-500 dark:bg-neutral-700  dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500",
					isDisabled && "cursor-not-allowed opacity-50",
					!isDisabled && "group-hover:border-gray-400",
					state.isFocused ? "!border-blue-500" : "dark:border-neutral-700",
				)}
			>
				<input
					{...inputProps}
					ref={inputRef}
					className="w-full bg-transparent p-2.5 outline-none"
				/>
				<button
					{...buttonProps}
					ref={buttonRef}
					type="button"
					className={clsx(
						"cursor-default border-l border-gray-300 bg-gray-100 px-1 dark:border-neutral-700 dark:bg-neutral-600",
						state.isFocused ? "!border-blue-500 text-blue-500" : "border-gray-300 text-gray-500",
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
					isNonModal
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
