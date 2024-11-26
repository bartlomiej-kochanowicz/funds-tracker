import { RECAPTCHA_SITE_KEY } from "config/env";
import { paths } from "config/paths";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router";

import { SignUp } from "./routes/sign-up";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const Homepage = lazy(() =>
	import("./routes/homepage").then(({ Homepage: component }) => ({ default: component })),
);

const SignIn = lazy(() =>
	import("./routes/sign-in").then(({ SignIn: component }) => ({ default: component })),
);

const NotFound = lazy(() =>
	import("./routes/not-found").then(({ NotFound: component }) => ({ default: component })),
);

const Router = () => {
	const location = useLocation();
	const background = location.state && location.state.background;

	const modals = [
		<Route
			key={paths.signIn}
			path={paths.signIn}
			element={
				<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
					<SignIn />
				</GoogleReCaptchaProvider>
			}
		/>,
		<Route
			key={paths.signUp.signUp}
			path={paths.signUp.signUp}
			element={<SignUp />}
		/>,
	];

	return (
		<>
			<Routes location={background || location}>
				<Route
					path={paths.homepage}
					element={<Homepage />}
				/>
				{!background ? modals : null}
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
			{/* Render modals here */}
			{background && <Routes>{modals}</Routes>}
		</>
	);
};

export { Router };
