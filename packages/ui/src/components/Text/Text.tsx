import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
	muted?: boolean;
}

export const Text = ({ children, className, muted, ...rest }: TextProps) => (
	<span
		className={twMerge(muted ? "text-muted-foreground" : "", className)}
		{...rest}
	>
		{children}
	</span>
);
