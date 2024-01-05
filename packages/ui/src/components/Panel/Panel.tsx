import { clsx } from "clsx";
import { FC, HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	className?: string;
}

export const Panel: FC<PanelProps> = ({ children, className }) => (
	<div
		className={clsx(
			"rounded-xl border-gray-300 bg-white px-3 py-1 shadow-sm dark:bg-neutral-700 md:px-6 md:py-3",
			className,
		)}
	>
		{children}
	</div>
);
