import * as AvatarPrimitive from "@radix-ui/react-avatar";
import clsx from "clsx";
import { forwardRef, useMemo } from "react";

import { Initials } from "../../helpers/Initials";

const Avatar = forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={clsx("relative flex size-10 shrink-0 overflow-hidden rounded-full", className)}
		{...props}
	/>
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={clsx("aspect-square size-full", className)}
		{...props}
	/>
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, children, ...props }, ref) => {
	if (typeof children !== "string") {
		return;
	}

	const initials = useMemo(() => new Initials(children).getInitials(), [children]);

	return (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={clsx(
				"flex size-full items-center justify-center rounded-full bg-primary text-white",
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
