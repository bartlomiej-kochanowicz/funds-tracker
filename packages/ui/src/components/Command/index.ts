import {
	Command as CommandComponent,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "./Command";

type CommandType = typeof CommandComponent;

interface ICommand extends CommandType {
	Dialog: typeof CommandDialog;
	Empty: typeof CommandEmpty;
	Group: typeof CommandGroup;
	Input: typeof CommandInput;
	Item: typeof CommandItem;
	List: typeof CommandList;
	Separator: typeof CommandSeparator;
	Shortcut: typeof CommandShortcut;
}

export const Command = Object.assign(CommandComponent, {
	Dialog: CommandDialog,
	Empty: CommandEmpty,
	Group: CommandGroup,
	Input: CommandInput,
	Item: CommandItem,
	List: CommandList,
	Separator: CommandSeparator,
	Shortcut: CommandShortcut,
}) as ICommand;
