import { LangSelector } from "components/LangSelector";

import { CurrencySelector } from "./components/CurrencySelector";

export const Settings = () => (
	<div className="flex w-fit flex-col gap-8">
		<LangSelector />
		<CurrencySelector />
	</div>
);
