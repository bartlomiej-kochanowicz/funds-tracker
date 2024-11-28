import { Suspense } from "react";

import { Provider } from "./provider";
import { Router } from "./router";

const App = () => {
	return (
		<Provider>
			<Suspense>
				<Router />
			</Suspense>
		</Provider>
	);
};

export default App;
