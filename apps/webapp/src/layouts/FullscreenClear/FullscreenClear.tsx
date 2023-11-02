import { ReactNode } from "react";

interface FullscreenClearProps {
	children: ReactNode;
}

export const FullscreenClear = ({ children, ...rest }: FullscreenClearProps) => (
	<div
		className="flex h-screen w-full flex-col items-center justify-center px-5 py-2"
		{...rest}
	>
		<div className="flex max-w-sm flex-col">{children}</div>
	</div>
);

FullscreenClear.displayName = "LayoutFullscreenClear";
