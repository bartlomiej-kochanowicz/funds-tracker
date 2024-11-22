import "base";
import "@funds-tracker/ui/src/index.css";
import "./index.css";

import { API_DOMAIN } from "config/env";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";

import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container!);

/* SuperTokens.init({
	appInfo: {
		apiDomain: API_DOMAIN,
		apiBasePath: "/auth",
		appName: "Funds Tracker",
	},
	recipeList: [Session.init(), EmailPassword.init(), ThirdParty.init()],
}); */

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
