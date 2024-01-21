import {
	DropdownMenu as DropdownMenuComponent,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "./DropdownMenu";

type DropdownMenuType = typeof DropdownMenuComponent;

interface IDropdownMenu extends DropdownMenuType {
	CheckboxItem: typeof DropdownMenuCheckboxItem;
	Content: typeof DropdownMenuContent;
	Group: typeof DropdownMenuGroup;
	Item: typeof DropdownMenuItem;
	Label: typeof DropdownMenuLabel;
	Portal: typeof DropdownMenuPortal;
	RadioGroup: typeof DropdownMenuRadioGroup;
	RadioItem: typeof DropdownMenuRadioItem;
	Separator: typeof DropdownMenuSeparator;
	Shortcut: typeof DropdownMenuShortcut;
	Sub: typeof DropdownMenuSub;
	SubContent: typeof DropdownMenuSubContent;
	SubTrigger: typeof DropdownMenuSubTrigger;
	Trigger: typeof DropdownMenuTrigger;
}

export const DropdownMenu = Object.assign(DropdownMenuComponent, {
	CheckboxItem: DropdownMenuCheckboxItem,
	Content: DropdownMenuContent,
	Group: DropdownMenuGroup,
	Item: DropdownMenuItem,
	Label: DropdownMenuLabel,
	Portal: DropdownMenuPortal,
	RadioGroup: DropdownMenuRadioGroup,
	RadioItem: DropdownMenuRadioItem,
	Separator: DropdownMenuSeparator,
	Shortcut: DropdownMenuShortcut,
	Sub: DropdownMenuSub,
	SubContent: DropdownMenuSubContent,
	SubTrigger: DropdownMenuSubTrigger,
	Trigger: DropdownMenuTrigger,
}) as IDropdownMenu;
