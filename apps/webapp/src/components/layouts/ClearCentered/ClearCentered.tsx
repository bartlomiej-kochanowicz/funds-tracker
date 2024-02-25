import { ReactNode } from "react";

interface ClearCenteredProps {
	children: ReactNode;
}

export const ClearCentered = ({ children, ...rest }: ClearCenteredProps) => (
	<main
		className="flex h-[100dvh] flex-col items-center justify-center px-5 py-2"
		{...rest}
	>
		{children}
	</main>
);
