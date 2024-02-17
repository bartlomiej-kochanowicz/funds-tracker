import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ComponentPropsWithoutRef, ElementRef, forwardRef, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { Initials } from "../../helpers/Initials";

const Avatar = forwardRef<
	ElementRef<typeof AvatarPrimitive.Root>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={twMerge("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)}
		{...props}
	/>
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
	ElementRef<typeof AvatarPrimitive.Image>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={twMerge("aspect-square size-full", className)}
		{...props}
	/>
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
	ElementRef<typeof AvatarPrimitive.Fallback>,
	ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => {
	if (typeof children !== "string") {
		return null;
	}

	const initials = useMemo(() => new Initials(children).getInitials(), [children]);

	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={twMerge(
				"flex size-full items-center justify-center rounded-full bg-primary text-primary-foreground font-bold",
				className,
			)}
			{...props}
		>
			{initials}
		</AvatarPrimitive.Fallback>
	);
});

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
