import clsx from "clsx";

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		className={clsx("animate-pulse rounded-md bg-muted", className)}
		{...props}
	/>
);

export { Skeleton };
