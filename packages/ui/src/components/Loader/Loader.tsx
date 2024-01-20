import clsx from "clsx";
import { Loader2 } from "lucide-react";

interface LoaderProps {
	className?: string;
}

export const Loader = ({ className, ...rest }: LoaderProps) => (
	<Loader2
		role="loader"
		className={clsx(className, "size-4 animate-spin")}
		{...rest}
	/>
);
