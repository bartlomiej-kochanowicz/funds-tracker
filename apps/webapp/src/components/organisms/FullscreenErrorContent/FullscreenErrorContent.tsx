import { ErrorContent } from "components/ErrorContent";
import { ClearCentered } from "components/layouts/ClearCentered";
import { FC } from "react";

export const FullscreenErrorContent: FC = () => (
	<ClearCentered>
		<ErrorContent />
	</ClearCentered>
);
