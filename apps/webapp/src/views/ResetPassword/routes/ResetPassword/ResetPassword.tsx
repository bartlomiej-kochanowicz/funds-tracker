import { Card } from "@funds-tracker/ui";
import { LangSelector } from "components/LangSelector";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeToggle } from "components/ThemeToggle";
import { useSearchParams } from "react-router-dom";

import { EnterEmail } from "./components/EnterEmail";
import { EnterPassword } from "./components/EnterPassword";

export const ResetPassword = () => {
	const [searchParams] = useSearchParams();

	const token = searchParams.get("token");

	return (
		<ClearCentered>
			<Card className="sm:max-w-md">
				{token ? <EnterPassword token={token} /> : <EnterEmail />}
			</Card>

			<div className="mx-32 mt-12 flex flex-col items-center gap-4">
				<LangSelector />

				<ThemeToggle />
			</div>
		</ClearCentered>
	);
};
