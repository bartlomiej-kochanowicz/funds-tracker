"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { VariantProps } from "class-variance-authority";
import {
	ComponentPropsWithoutRef,
	createContext,
	ElementRef,
	forwardRef,
	useContext,
	useMemo,
} from "react";
import { twMerge } from "tailwind-merge";

import { toggleVariants } from "../Toggle";

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
	size: "default",
	variant: "default",
});

const ToggleGroup = forwardRef<
	ElementRef<typeof ToggleGroupPrimitive.Root>,
	ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => {
	const contextValue = useMemo(() => ({ variant, size }), [variant, size]);

	return (
		<ToggleGroupPrimitive.Root
			ref={ref}
			className={twMerge("flex items-center justify-center gap-1", className)}
			{...props}
		>
			<ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
		</ToggleGroupPrimitive.Root>
	);
});

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = forwardRef<
	ElementRef<typeof ToggleGroupPrimitive.Item>,
	ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> & VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
	const context = useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={twMerge(
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
