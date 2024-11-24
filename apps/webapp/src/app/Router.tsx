import { RECAPTCHA_SITE_KEY } from "config/env";
import { paths } from "config/paths";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router";

import { Register } from "./routes/register";

const GoogleReCaptchaProvider = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptchaProvider: component }) => ({
		default: component,
	})),
);

const Homepage = lazy(() =>
	import("./routes/homepage").then(({ Homepage: component }) => ({ default: component })),
);

const Login = lazy(() =>
	import("./routes/login").then(({ Login: component }) => ({ default: component })),
);

const NotFound = lazy(() =>
	import("./routes/not-found").then(({ NotFound: component }) => ({ default: component })),
);

const Router = () => {
	const location = useLocation();
	const background = location.state && location.state.background;

	return (
		<>
			<Routes location={background || location}>
				<Route
					path={paths.homepage}
					element={<Homepage />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
			{/* Render modals here */}
			{background && (
				<Routes>
					<Route
						path={paths.login}
						element={
							<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
								<Login />
							</GoogleReCaptchaProvider>
						}
					/>
					<Route
						path={paths.register.register}
						element={<Register />}
					/>
				</Routes>
			)}
		</>
	);
};

export { Router };
