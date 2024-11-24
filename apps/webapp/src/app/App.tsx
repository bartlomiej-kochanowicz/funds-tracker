import { Toaster } from "@funds-tracker/ui";
import { Suspense } from "react";

import { Provider } from "./provider";
import { Router } from "./router";

const App = () => (
	<Provider>
		<Toaster />

		<Suspense>
			<Router />
		</Suspense>
	</Provider>
);

export default App;
