import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import ThirdParty from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";

import { API_DOMAIN } from "./env";

export const SuperTokensConfig = {
	appInfo: {
		apiDomain: API_DOMAIN,
		apiBasePath: "/auth",
		appName: "Funds Tracker",
		websiteDomain: "http://localhost:3000",
	},
	recipeList: [
		EmailPassword.init(),
		ThirdParty.init({
			signInAndUpFeature: {
				providers: [ThirdParty.Google.init(), ThirdParty.Apple.init()],
			},
		}),
		EmailVerification.init({
			mode: "REQUIRED",
		}),
		Session.init(),
	],
};

export const PreBuiltUIList = [
	EmailPasswordPreBuiltUI,
	ThirdPartyPreBuiltUI,
	EmailVerificationPreBuiltUI,
];
