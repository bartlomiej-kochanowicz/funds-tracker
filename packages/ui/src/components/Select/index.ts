import {
	Select as SelectComponent,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
} from "./Select";

type SelectType = typeof SelectComponent;

interface ISelect extends SelectType {
	Content: typeof SelectContent;
	Group: typeof SelectGroup;
	Item: typeof SelectItem;
	Label: typeof SelectLabel;
	ScrollDownButton: typeof SelectScrollDownButton;
	ScrollUpButton: typeof SelectScrollUpButton;
	Separator: typeof SelectSeparator;
	rigger: typeof SelectTrigger;
	Value: typeof SelectValue;
}

export const Select = Object.assign(SelectComponent, {
	Content: SelectContent,
	Group: SelectGroup,
	Item: SelectItem,
	Label: SelectLabel,
	ScrollDownButton: SelectScrollDownButton,
	ScrollUpButton: SelectScrollUpButton,
	Separator: SelectSeparator,
	rigger: SelectTrigger,
	Value: SelectValue,
}) as ISelect;
