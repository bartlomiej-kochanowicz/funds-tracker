import { PublicRoute } from "components/PublicRoute";
import { RECAPTCHA_SITE_KEY } from "config/env";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const Signin = lazy(() =>
	import("./Signin").then(({ Signin: component }) => ({ default: component })),
);

export const SinginRoutes = [
	{
		path: ROUTES.SIGNIN,
		element: (
			<PublicRoute>
				<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
					<Signin />
				</GoogleReCaptchaProvider>
			</PublicRoute>
		),
	},
];
