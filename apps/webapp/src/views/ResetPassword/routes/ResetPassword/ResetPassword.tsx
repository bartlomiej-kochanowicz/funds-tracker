import { ThemeSwitcher } from "components";
import { Spacer } from "components/atoms";
import { LangSelector } from "components/molecules";
import { ClearCentered } from "components/layouts/ClearCentered";
import { useSearchParams } from "react-router-dom";

import { EnterEmail } from "./components/EnterEmail";
import { EnterPassword } from "./components/EnterPassword";

export const ResetPassword = () => {
	const [searchParams] = useSearchParams();

	const token = searchParams.get("token");

	return (
		<ClearCentered>
			{token ? <EnterPassword token={token} /> : <EnterEmail />}

			<Spacer $space="1.5" />

			<Spacer $space="1.5" />

			<div className="flex flex-col items-center">
				<LangSelector />

				<Spacer />

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
