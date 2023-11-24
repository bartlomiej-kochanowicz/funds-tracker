import { Item, Section } from "react-stately";

import { MenuButton } from "./MenuButton";

type MenuButtonType = typeof MenuButton;

interface IMenu extends MenuButtonType {
	Item: typeof Item;
	Section: typeof Section;
}

export const Menu = Object.assign(MenuButton, {
	Item,
	Section,
}) as IMenu;
