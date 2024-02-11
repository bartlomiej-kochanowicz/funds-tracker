import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	children: ReactNode;
}

export const Badge = ({ children, className, ...rest }: BadgeProps) => (
	<span
		className={twMerge(
			"w-min whitespace-nowrap rounded-md bg-blue-500 px-2 py-0.5 text-xs font-bold text-white",
			className,
		)}
		{...rest}
	>
		{children}
	</span>
);
