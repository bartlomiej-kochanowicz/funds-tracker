import cslx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
	muted?: boolean;
}

export const Text = ({ children, className, muted, ...rest }: TextProps) => (
	<span
		className={cslx(muted ? "text-muted-foreground" : "", className)}
		{...rest}
	>
		{children}
	</span>
);
