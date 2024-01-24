import { Skeleton } from "@funds-tracker/ui";
import { Fragment } from "react";

export const CardListSkeleton = () => (
	<Fragment>
		<Skeleton className="h-[94px] w-full" />
		<Skeleton className="h-[94px] w-full" />
		<Skeleton className="h-[94px] w-full" />
		<Skeleton className="h-[94px] w-full" />
		<Skeleton className="h-[94px] w-full" />
	</Fragment>
);
