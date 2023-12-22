import { Loader } from "@faunds-tracker/ui";
import { FC } from "react";

export const FullscreenLoading: FC = () => (
	<div className="flex h-screen items-center justify-center">
		<Loader />
	</div>
);
