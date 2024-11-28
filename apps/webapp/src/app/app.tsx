import { Suspense } from "react";

import { Provider } from "./provider";
import { Router } from "./router";

const App = () => (
	<Provider>
		<Suspense>
			<Router />
		</Suspense>
	</Provider>
);

export default App;
