import {
	Content,
	Portal,
	Root as Popover,
	Trigger as PopoverTrigger,
} from "@radix-ui/react-popover";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const PopoverContent = forwardRef<
	React.ElementRef<typeof Content>,
	React.ComponentPropsWithoutRef<typeof Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
	<Portal>
		<Content
			ref={ref}
			align={align}
			sideOffset={sideOffset}
			className={twMerge(
				"z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
				className,
			)}
			// TODO: Temporary fix for scrolling in Popover inside Dialog
			onWheel={e => {
				e.stopPropagation();
				const isScrollingDown = e.deltaY > 0;
				if (isScrollingDown) {
					e.currentTarget.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" }));
				} else {
					e.currentTarget.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" }));
				}
			}}
			{...props}
		/>
	</Portal>
));
PopoverContent.displayName = Content.displayName;

export { Popover, PopoverContent, PopoverTrigger };
