import cslx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
}

export const Text = ({ children, className, ...rest }: TextProps) => (
	<span
		className={cslx("text-primary-foreground", className)}
		{...rest}
	>
		{children}
	</span>
);
