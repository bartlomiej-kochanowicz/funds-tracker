import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "utils/i18n";

import { IS_DEVELOPMENT, LOG_ROCKET_KEY } from "config/env";
import { documentHeight } from "helpers/documentHeight";
import LogRocket from "logrocket";
import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import ThirdPartyEmailPassword from "supertokens-web-js/recipe/thirdpartyemailpassword";
import { registerSW } from "virtual:pwa-register";

SuperTokens.init({
	appInfo: {
		apiDomain: "http://localhost:4000",
		apiBasePath: "/",
		appName: "funds-tracker",
	},
	recipeList: [Session.init(), ThirdPartyEmailPassword.init()],
});

registerSW({ immediate: true });

window.addEventListener("resize", documentHeight);

documentHeight();

if (!IS_DEVELOPMENT) {
	LogRocket.init(LOG_ROCKET_KEY);
}
