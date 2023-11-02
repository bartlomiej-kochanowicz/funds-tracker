import { ReactNode } from "react";

interface ClearCenteredProps {
	children: ReactNode;
}

export const ClearCentered = ({ children, ...rest }: ClearCenteredProps) => (
	<main
		className="flex h-screen w-full flex-col items-center justify-center px-5 py-2"
		{...rest}
	>
		<div className="flex max-w-sm flex-col">{children}</div>
	</main>
);
