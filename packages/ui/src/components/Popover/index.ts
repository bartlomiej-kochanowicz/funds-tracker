import { Popover as PopoverComponent, PopoverContent, PopoverTrigger } from "./Popover";

type PopoverType = typeof PopoverComponent;

interface IPopover extends PopoverType {
	Content: typeof PopoverContent;
	Trigger: typeof PopoverTrigger;
}

export const Popover = Object.assign(PopoverComponent, {
	Content: PopoverContent,
	Trigger: PopoverTrigger,
}) as IPopover;
