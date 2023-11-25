import { Item } from "react-stately";

import { ComboBox as ComboBoxComponent } from "./ComboBox";

type ComboBoxType = typeof ComboBoxComponent;

interface IComboBox extends ComboBoxType {
	Item: typeof Item;
}

export const ComboBox = Object.assign(ComboBoxComponent, {
	Item,
}) as IComboBox;
