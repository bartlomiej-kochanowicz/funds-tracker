import { FC } from "react";
import { Loader } from "ui";

export const FullscreenLoading: FC = () => (
	<div className="flex h-screen items-center justify-center">
		<Loader />
	</div>
);
