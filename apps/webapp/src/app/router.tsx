import { ProtectedRoute } from "components/protected-route";
import { RECAPTCHA_SITE_KEY } from "config/env";
import { paths } from "config/paths";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

import { SignUp } from "./routes/sign-up";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const SidebarLayout = lazy(() =>
	import("../layouts/sidebar-layout").then(({ SidebarLayout: component }) => ({
		default: component,
	})),
);

const Homepage = lazy(() =>
	import("./routes/homepage").then(({ Homepage: component }) => ({ default: component })),
);

const SignIn = lazy(() =>
	import("./routes/sign-in").then(({ SignIn: component }) => ({ default: component })),
);

const SignUpConfirm = lazy(() =>
	import("./routes/sign-up-confirm").then(({ SignUpConfirm: component }) => ({
		default: component,
	})),
);

const ResetPassword = lazy(() =>
	import("./routes/reset-password").then(({ ResetPassword: component }) => ({
		default: component,
	})),
);

const Dashboard = lazy(() =>
	import("./routes/dashboard").then(({ Dashboard: component }) => ({
		default: component,
	})),
);

const NotFound = lazy(() =>
	import("./routes/not-found").then(({ NotFound: component }) => ({ default: component })),
);

const Router = () => (
	<Routes>
		<Route
			path={paths.homepage}
			element={<Homepage />}
		/>
		<Route
			path={paths.signIn}
			element={
				<>
					<Homepage />
					<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
						<SignIn />
					</GoogleReCaptchaProvider>
				</>
			}
		/>
		<Route
			path={paths.signUp.signUp}
			element={
				<>
					<Homepage />
					<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
						<SignUp />
					</GoogleReCaptchaProvider>
				</>
			}
		/>
		<Route
			path={paths.signUp.confirm}
			element={
				<>
					<Homepage />
					<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
						<SignUpConfirm />
					</GoogleReCaptchaProvider>
				</>
			}
		/>
		<Route
			path={paths.resetPassword}
			element={
				<>
					<Homepage />
					<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
						<ResetPassword />
					</GoogleReCaptchaProvider>
				</>
			}
		/>
		<Route
			path={paths.dashboard}
			element={
				<ProtectedRoute>
					<SidebarLayout>
						<Dashboard />
					</SidebarLayout>
				</ProtectedRoute>
			}
		/>
		<Route
			path="*"
			element={<NotFound />}
		/>
	</Routes>
);

export { Router };
