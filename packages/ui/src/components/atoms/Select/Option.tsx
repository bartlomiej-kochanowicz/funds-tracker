import clsx from "clsx";
import { Check } from "lucide-react";
import { useRef } from "react";
import { useOption } from "react-aria";
import { ListState, Node } from "react-stately";

interface OptionProps {
	item: Node<unknown>;
	state: ListState<unknown>;
}

export const Option = ({ item, state }: OptionProps) => {
	const ref = useRef<HTMLLIElement>(null);
	const { optionProps, isDisabled, isSelected, isFocused } = useOption(
		{
			key: item.key,
		},
		state,
		ref,
	);

	return (
		<li
			{...optionProps}
			ref={ref}
			className={clsx(
				"relative mx-1 flex cursor-default select-none items-center justify-between rounded px-3 py-2 text-sm focus:outline-none",
				isFocused ? "bg-blue-500 text-white" : "text-gray-900 dark:text-white",
				isSelected && "font-bold",
			)}
		>
			{item.rendered}
			{isSelected && (
				<Check
					aria-hidden="true"
					className={clsx("h-5 w-5", isFocused ? "text-white" : "text-gray-900 dark:text-white")}
				/>
			)}
		</li>
	);
};
