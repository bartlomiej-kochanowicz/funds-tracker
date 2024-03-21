import { ToggleGroup as ToggleGroupComponent, ToggleGroupItem } from "./ToggleGroup";

type ToggleGroupType = typeof ToggleGroupComponent;

interface IToggleGroup extends ToggleGroupType {
	Item: typeof ToggleGroupItem;
}

export const ToggleGroup = Object.assign(ToggleGroupComponent, {
	Item: ToggleGroupItem,
}) as IToggleGroup;
