import { useRef } from "react";
import { type AriaListBoxOptions, useListBox } from "react-aria";
import { type ListState } from "react-stately";

import { ListBoxSection } from "./ListBoxSection";
import { Option } from "./Option";

interface ListBoxProps extends AriaListBoxOptions<unknown> {
	listBoxRef?: React.RefObject<HTMLUListElement>;
	state: ListState<unknown>;
}

export function ListBox(props: ListBoxProps) {
	const ref = useRef<HTMLUListElement>(null);
	const { listBoxRef = ref, state } = props;
	const { listBoxProps } = useListBox(props, state, listBoxRef);

	return (
		<ul
			{...listBoxProps}
			ref={listBoxRef}
			className="max-h-72 w-full overflow-auto outline-none"
		>
			{[...state.collection].map(item =>
				item.type === "section" ? (
					<ListBoxSection
						key={item.key}
						section={item}
						state={state}
					/>
				) : (
					<Option
						key={item.key}
						item={item}
						state={state}
					/>
				),
			)}
		</ul>
	);
}
