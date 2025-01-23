import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "lib/utils";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";

const Separator = forwardRef<
	ElementRef<typeof SeparatorPrimitive.Root>,
	ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, children, ...props }, ref) => {
	const widthStyle = `${children ? "flex-grow" : "w-full"} h-[1px]`;
	const heightStyle = `${children ? "flex-grow" : "h-full"} w-[1px]`;

	const separator = (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border",
				orientation === "horizontal" ? widthStyle : heightStyle,
				className,
			)}
			{...props}
		/>
	);

	if (children) {
		return (
			<div className="flex items-center gap-5">
				{separator}
				{children}
				{separator}
			</div>
		);
	}

	return separator;
});

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
