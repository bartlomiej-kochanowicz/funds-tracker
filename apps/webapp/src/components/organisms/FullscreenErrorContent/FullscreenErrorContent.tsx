import { ErrorContent } from "components/molecules";
import { ClearCentered } from "layouts/ClearCentered";
import { FC } from "react";

export const FullscreenErrorContent: FC = () => (
	<ClearCentered>
		<ErrorContent />
	</ClearCentered>
);
