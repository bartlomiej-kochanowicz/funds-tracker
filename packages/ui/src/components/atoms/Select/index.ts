import { Item } from "react-stately";

import { Select as SelectComponent } from "./Select";

type SelectType = typeof SelectComponent;

interface ISelect extends SelectType {
	Item: typeof Item;
}

export const Select = Object.assign(SelectComponent, {
	Item,
}) as ISelect;
