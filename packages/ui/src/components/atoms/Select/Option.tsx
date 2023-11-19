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

	let text = "text-gray-700";
	if (isFocused || isSelected) {
		text = "text-pink-600";
	} else if (isDisabled) {
		text = "text-gray-200";
	}

	return (
		<li
			{...optionProps}
			ref={ref}
			className={`m-1 flex cursor-default items-center justify-between rounded-md px-2 py-2 text-sm outline-none ${text} ${
				isFocused ? "bg-pink-100" : ""
			} ${isSelected ? "font-bold" : ""}`}
		>
			{item.rendered}
			{isSelected && (
				<Check
					aria-hidden="true"
					className="h-5 w-5 text-pink-600"
				/>
			)}
		</li>
	);
};
