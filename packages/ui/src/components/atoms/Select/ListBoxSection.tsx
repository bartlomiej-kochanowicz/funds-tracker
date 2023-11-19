import { useListBoxSection } from "react-aria";
import { type ListState, type Node } from "react-stately";

import { Option } from "./Option";

interface ListBoxSectionProps {
	section: Node<unknown>;
	state: ListState<unknown>;
}

export const ListBoxSection = ({ section, state }: ListBoxSectionProps) => {
	const { itemProps, headingProps, groupProps } = useListBoxSection({
		heading: section.rendered,
		"aria-label": section["aria-label"],
	});

	return (
		<li
			{...itemProps}
			className="pt-2"
		>
			{section.rendered && (
				<span
					{...headingProps}
					className="mx-3 text-xs font-bold uppercase text-gray-500"
				>
					{section.rendered}
				</span>
			)}
			<ul {...groupProps}>
				{[...section.childNodes].map(node => (
					<Option
						key={node.key}
						item={node}
						state={state}
					/>
				))}
			</ul>
		</li>
	);
};
