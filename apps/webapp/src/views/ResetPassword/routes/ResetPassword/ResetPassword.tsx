import { Box, Spacer, ThemeSwitcher } from "components/atoms";
import { LangSelector } from "components/molecules";
import { FullscreenClear } from "layouts/FullscreenClear";
import { useSearchParams } from "react-router-dom";

import { EnterEmail } from "./components/EnterEmail";
import { EnterPassword } from "./components/EnterPassword";

export const ResetPassword = () => {
	const [searchParams] = useSearchParams();

	const token = searchParams.get("token");

	return (
		<FullscreenClear>
			{token ? <EnterPassword token={token} /> : <EnterEmail />}

			<Spacer $space="1.5" />

			<Spacer $space="1.5" />

			<Box
				$flex
				$flexDirection="column"
				$alignItems="center"
			>
				<LangSelector />

				<Spacer />

				<ThemeSwitcher />
			</Box>
		</FullscreenClear>
	);
};
