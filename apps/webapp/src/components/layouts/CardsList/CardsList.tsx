import { H1, Text } from "@funds-tracker/ui";
import { ErrorBoundary } from "components/ErrorBoundary";
import { ErrorContent } from "components/ErrorContent";
import { Fragment, ReactNode, Suspense } from "react";

import { CardListSkeleton } from "./components/CardListSkeleton";

interface CardsListProps {
	children: ReactNode;
	title: string;
	description?: string;
}

export const CardsList = ({ children, title, description }: CardsListProps) => (
	<Fragment>
		<H1>{title}</H1>

		<Text
			muted
			className="mt-4 block text-sm"
		>
			{description}
		</Text>

		<div className="mx-auto my-8 flex max-w-3xl flex-col gap-4">
			<ErrorBoundary fallback={<ErrorContent />}>
				<Suspense fallback={<CardListSkeleton />}>{children}</Suspense>
			</ErrorBoundary>
		</div>
	</Fragment>
);
