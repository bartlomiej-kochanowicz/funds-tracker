import { useRef } from "react";
import { AriaMenuProps, useMenu } from "react-aria";
import { useTreeState } from "react-stately";

import { MenuSection } from "./MenuSection";

interface MenuProps<T extends object> extends AriaMenuProps<T> {
	onClose: () => void;
}

export const Menu = <T extends object>(props: MenuProps<T>) => {
	const state = useTreeState(props);

	const ref = useRef<HTMLUListElement>(null);
	const { menuProps } = useMenu(props, state, ref);

	const { onAction, onClose } = props;

	return (
		<ul
			{...menuProps}
			ref={ref}
			className="outline-none"
		>
			{[...state.collection].map(item => (
				<MenuSection
					key={item.key}
					section={item}
					state={state}
					onAction={onAction}
					onClose={onClose}
				/>
			))}
		</ul>
	);
};
