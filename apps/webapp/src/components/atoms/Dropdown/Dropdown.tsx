import { ItemButton, ItemLink, useDropdownMenu } from "hooks/useDropdownMenu";
import { forwardRef, Fragment, Key, MouseEventHandler, ReactNode, Ref, useRef } from "react";
import { IconType } from "react-icons";
import { mergeRefs, useLayer } from "react-laag";
import { PlacementType } from "react-laag/dist/PlacementType";

import { Menu } from "../Menu";
import { ItemChildrenProps } from "../Menu/MenuItem";
import { Trigger } from "./Dropdown.styles";

type ItemCommon = {
	value: string | number;
	label: string | ReactNode | ((props: ItemChildrenProps) => ReactNode);
	divider?: "top" | "bottom" | "both";
	icon?: IconType;
};

export type Item = (ItemCommon & ItemButton) | (ItemCommon & ItemLink);

export type DropdownItems = Item[];

interface DropdownProps {
	items: Item[];
	placement?: PlacementType;
	children:
		| ReactNode
		| ((props: {
				isOpen?: boolean;
				onClick?: MouseEventHandler<HTMLButtonElement>;
				ref: Ref<HTMLButtonElement>;
		  }) => ReactNode);
	triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
	({ items, placement = "bottom-center", children, triggerOffset = 5, ...rest }, ref) => {
		const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(items);

		const triggerRef = useRef<HTMLButtonElement>(null);

		const isInModal = Boolean(triggerRef.current?.closest('[data-modal="true"]'));

		const { renderLayer, triggerProps, layerProps } = useLayer({
			isOpen,
			placement,
			auto: true,
			container: isInModal
				? (document.querySelector('[data-modal="true"]') as HTMLElement)
				: undefined,
			possiblePlacements: [
				"top-start",
				"top-center",
				"top-end",
				"bottom-start",
				"bottom-center",
				"bottom-end",
			],
			triggerOffset,
		});

		return (
			<Fragment>
				{typeof children === "function" &&
					children({
						isOpen,
						...rest,
						...buttonProps,
						ref: mergeRefs(ref, triggerProps.ref, buttonProps.ref, triggerRef),
					})}

				{typeof children !== "function" && (
					<Trigger
						{...rest}
						{...buttonProps}
						ref={mergeRefs(ref, triggerProps.ref, buttonProps.ref, triggerRef)}
						type="button"
					>
						{children}
					</Trigger>
				)}

				{renderLayer(
					isOpen && (
						<Menu
							$isInModal={isInModal}
							role="menu"
							{...layerProps}
						>
							{items.map(({ value = "", label = "", divider, onClick, ...itemRest }, index) => (
								<Fragment key={value as Key}>
									{(divider === "top" || divider === "both") && <Menu.Divider />}

									<Menu.Item
										{...itemRest}
										{...(onClick
											? {
													onClick: () => {
														onClick();
														setIsOpen(false);
													},
											  }
											: {})}
										{...itemProps[index]}
									>
										{label}
									</Menu.Item>

									{(divider === "bottom" || divider === "both") && <Menu.Divider />}
								</Fragment>
							))}
						</Menu>
					),
				)}
			</Fragment>
		);
	},
);

Dropdown.displayName = "Dropdown";
