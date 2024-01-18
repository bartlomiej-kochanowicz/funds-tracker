import { clsx } from "clsx";
import { FC, HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
	className?: string;
}

export const Panel: FC<PanelProps> = ({ children, className }) => (
	<div
		className={clsx(
			className,
			"rounded-xl border-gray-300 bg-white px-6 py-3 shadow-sm dark:bg-neutral-700",
		)}
	>
		{children}
	</div>
);
