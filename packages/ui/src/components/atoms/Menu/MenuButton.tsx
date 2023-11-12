import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { type AriaMenuProps, useMenuTrigger } from "react-aria";
import { type MenuTriggerProps, useMenuTriggerState } from "react-stately";

import { Button } from "./Button";
import { Menu } from "./Menu";
import { Popover } from "./Popover";

interface MenuButtonProps<T extends object> extends AriaMenuProps<T>, MenuTriggerProps {
	label: string;
}

export const MenuButton = <T extends object>(props: MenuButtonProps<T>) => {
	const state = useMenuTriggerState(props);

	const ref = useRef<HTMLButtonElement>(null);
	const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);

	const { label } = props;

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<Button
				{...menuTriggerProps}
				isPressed={state.isOpen}
				ref={ref}
			>
				{label}
				<ChevronDown className="-mr-2 ml-1 inline h-5 w-5" />
			</Button>
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
						onClose={() => state.close()}
					/>
				</Popover>
			)}
		</div>
	);
};
