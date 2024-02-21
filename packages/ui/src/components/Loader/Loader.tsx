import { Loader2 } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
	className?: string;
}

export const Loader = ({ className, ...rest }: LoaderProps) => (
	<Loader2
		className={twMerge(className, "size-4 animate-spin")}
		{...rest}
	/>
);
