import {
	Tooltip as TooltipComponent,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./Tooltip";

type TooltipType = typeof TooltipComponent;

interface ITooltip extends TooltipType {
	Content: typeof TooltipContent;
	Provider: typeof TooltipProvider;
	Trigger: typeof TooltipTrigger;
}

export const Tooltip = Object.assign(TooltipComponent, {
	Content: TooltipContent,
	Provider: TooltipProvider,
	Trigger: TooltipTrigger,
}) as ITooltip;
