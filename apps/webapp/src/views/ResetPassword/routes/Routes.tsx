import { RECAPTCHA_SITE_KEY } from "config/env";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const ResetPassword = lazy(() =>
	import("./ResetPassword").then(({ ResetPassword: component }) => ({ default: component })),
);

export const ResetPasswordRoutes = [
	{
		path: ROUTES.RESET_PASSWORD,
		element: (
			<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
				<ResetPassword />
			</GoogleReCaptchaProvider>
		),
	},
];
