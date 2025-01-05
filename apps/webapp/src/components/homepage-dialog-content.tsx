import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@funds-tracker/ui";
import { ReactNode } from "react";

import { ErrorBoundary } from "./error-boundary";
import { ErrorMessage } from "./error-message";
import { Logo } from "./logo";

type Props = {
	children: ReactNode;
	title: string;
	description: string;
};

const HomepageDialogContent = ({ children, title, description }: Props) => (
	<DialogContent mobileFullScreen>
		<div className="mx-auto max-w-96">
			<ErrorBoundary fallback={<ErrorMessage className="h-52" />}>
				<Logo className="mx-auto size-10" />

				<div className="flex h-[calc(100svh-104px)] items-center sm:h-auto">
					<div>
						<DialogHeader className="mb-10 sm:my-10">
							<DialogTitle>{title}</DialogTitle>
							<DialogDescription>{description}</DialogDescription>
						</DialogHeader>

						{children}
					</div>
				</div>
			</ErrorBoundary>
		</div>
	</DialogContent>
);

export { HomepageDialogContent };
