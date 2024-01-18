import { Key, useMenuSection, useSeparator } from "react-aria";
import { type Node, type TreeState } from "react-stately";

import { MenuItem } from "./MenuItem";

interface MenuSectionProps<T> {
	section: Node<T>;
	state: TreeState<T>;
	onAction?: (key: Key) => void;
	onClose: () => void;
}

export const MenuSection = <T,>({ section, state, onAction, onClose }: MenuSectionProps<T>) => {
	const { itemProps, groupProps } = useMenuSection({
		heading: section.rendered,
		"aria-label": section["aria-label"],
	});

	const { separatorProps } = useSeparator({
		elementType: "li",
	});

	return (
		<>
			{section.key !== state.collection.getFirstKey() && (
				<li
					{...separatorProps}
					className="mx-2 my-1 border-t border-gray-300 dark:border-neutral-700"
				/>
			)}
			<li {...itemProps}>
				<ul {...groupProps}>
					{[...section.childNodes].map(node => (
						<MenuItem
							key={node.key}
							item={node}
							state={state}
							onAction={onAction}
							onClose={onClose}
						/>
					))}
				</ul>
			</li>
		</>
	);
};
