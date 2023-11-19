import cslx from "clsx";
import { HTMLAttributes, ReactNode } from "react";

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
	children?: ReactNode;
}

export const Text = ({ children, className, ...rest }: TextProps) => (
	<p
		className={cslx("text-gray-900 dark:text-gray-300", className)}
		{...rest}
	>
		{children}
	</p>
);
