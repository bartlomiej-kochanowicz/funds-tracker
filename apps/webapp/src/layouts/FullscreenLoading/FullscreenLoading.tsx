import { Loader } from "components/atoms/Loader";
import { FC } from "react";

export const FullscreenLoading: FC = () => (
	<div className="flex h-screen items-center justify-center">
		<Loader $size="large" />
	</div>
);
