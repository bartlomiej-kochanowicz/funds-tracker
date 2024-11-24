import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
	muted?: boolean;
}

const Text = ({ children, className, muted, ...rest }: TextProps) => (
	<span
		className={twMerge(muted ? "text-muted-foreground" : "", className)}
		{...rest}
	>
		{children}
	</span>
);

export { Text };
