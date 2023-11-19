import { FC, HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const Panel: FC<PanelProps> = ({ children }) => (
	<div className="rounded-xl bg-neutral-200 px-3 py-1 shadow-sm dark:bg-neutral-700 md:px-6 md:py-3">
		{children}
	</div>
);
