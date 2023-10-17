import { ErrorContent } from "components/molecules";
import { FullscreenClear } from "layouts/FullscreenClear";
import { FC } from "react";

export const FullscreenErrorContent: FC = () => (
	<FullscreenClear>
		<ErrorContent />
	</FullscreenClear>
);
