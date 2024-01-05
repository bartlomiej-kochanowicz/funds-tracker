import clsx from "clsx";
import { useRef } from "react";
import { Key, useMenuItem } from "react-aria";
import { type Node, type TreeState } from "react-stately";

interface MenuItemProps<T> {
	item: Node<T>;
	state: TreeState<T>;
	onAction?: (key: Key) => void;
	onClose: () => void;
	className?: string;
}

export const MenuItem = <T,>({ item, state, onAction, onClose, className }: MenuItemProps<T>) => {
	const ref = useRef<HTMLLIElement>(null);
	const { menuItemProps } = useMenuItem(
		{
			key: item.key,
			onAction,
			onClose,
		},
		state,
		ref,
	);

	const isFocused = state.selectionManager.focusedKey === item.key;

	return (
		<li
			{...menuItemProps}
			ref={ref}
			className={clsx(
				className,
				"relative mx-1 cursor-pointer select-none rounded border-none px-3 py-2 text-sm transition-colors focus:outline-none",
				isFocused ? "bg-blue-500 text-white" : "text-gray-900 dark:text-white",
			)}
		>
			{item.rendered}
		</li>
	);
};
