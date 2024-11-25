import { Toaster } from "@funds-tracker/ui";
import { useTheme } from "next-themes";
import { ComponentProps, Suspense } from "react";

import { Provider } from "./provider";
import { Router } from "./router";

const App = () => {
	const { theme = "system" } = useTheme();

	return (
		<Provider>
			<Toaster theme={theme as ComponentProps<typeof Toaster>["theme"]} />

			<Suspense>
				<Router />
			</Suspense>
		</Provider>
	);
};

export default App;
