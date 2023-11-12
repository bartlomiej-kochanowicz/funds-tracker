import { Fragment, RefObject, useRef } from "react";
import { AriaButtonProps, type AriaMenuProps, useMenuTrigger } from "react-aria";
import { type MenuTriggerProps, useMenuTriggerState } from "react-stately";

import { Popover } from "../Popover";
import { Menu } from "./Menu";

interface MenuButtonProps<T extends object> extends AriaMenuProps<T>, MenuTriggerProps {
	triggerElement: (
		menuTriggerProps: AriaButtonProps<"button">,
		ref: RefObject<HTMLButtonElement>,
		isOpen: boolean,
	) => JSX.Element;
}

export const MenuButton = <T extends object>({ triggerElement, ...props }: MenuButtonProps<T>) => {
	const state = useMenuTriggerState(props);

	const ref = useRef<HTMLButtonElement>(null);
	const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

	return (
		<Fragment>
			{triggerElement(menuTriggerProps, ref, state.isOpen)}

			{state.isOpen && (
				<Popover
					state={state}
					triggerRef={ref}
					placement="bottom start"
				>
					<Menu
						{...menuProps}
						{...props}
						autoFocus={state.focusStrategy || true}
						onClose={state.close}
					/>
				</Popover>
			)}
		</Fragment>
	);
};
