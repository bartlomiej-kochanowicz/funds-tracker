import { PublicRoute } from "components/PublicRoute";
import { RECAPTCHA_SITE_KEY } from "config/env";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const Signup = lazy(() =>
	import("./Signup").then(({ Signup: component }) => ({ default: component })),
);

const Confirm = lazy(() =>
	import("./Confirm").then(({ Confirm: component }) => ({ default: component })),
);

export const SignupRoutes = [
	{
		path: ROUTES.SIGNUP.SIGNUP,
		element: (
			<PublicRoute>
				<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
					<Signup />
				</GoogleReCaptchaProvider>
			</PublicRoute>
		),
	},
	{
		path: ROUTES.SIGNUP.CONFIRM,
		element: (
			<PublicRoute>
				<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
					<Confirm />
				</GoogleReCaptchaProvider>
			</PublicRoute>
		),
	},
];
