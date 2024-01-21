import { Card } from "@funds-tracker/ui";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { useSearchParams } from "react-router-dom";

import { EnterEmail } from "./components/EnterEmail";
import { EnterPassword } from "./components/EnterPassword";

export const ResetPassword = () => {
	const [searchParams] = useSearchParams();

	const token = searchParams.get("token");

	return (
		<ClearCentered>
			<Card>{token ? <EnterPassword token={token} /> : <EnterEmail />}</Card>

			<div className="mt-12 flex flex-col items-center">
				{/* <LangSelector /> */}

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
