import { FC, HTMLAttributes, ReactNode } from "react";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export const Panel: FC<PanelProps> = ({ children }) => (
	<div className="rounded-xl bg-white px-3 py-1 dark:bg-gray-300 md:px-6 md:py-3">{children}</div>
);
