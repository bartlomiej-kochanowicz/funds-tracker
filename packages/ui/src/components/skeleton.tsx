import { HTMLAttributes } from "react";

import { cn } from "@/src/lib/utils";

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-muted", className)}
			{...props}
		/>
	);
};

export { Skeleton };
