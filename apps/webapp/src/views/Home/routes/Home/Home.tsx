import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { RECAPTCHA_SITE_KEY } from "config/env";
import { useUserContext } from "contexts/UserContext";
import { FC } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Signin } from "views/Signin/routes/Signin";

import { Dashboard } from "../Dashboard";

export const Home: FC = () => {
	const { user, loading } = useUserContext();

	const isAuthenticated = Boolean(!loading && user);

	if (loading) {
		return null;
	}

	if (!isAuthenticated) {
		return (
			<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
				<Signin />
			</GoogleReCaptchaProvider>
		);
	}

	return (
		<TopbarSidebar>
			<Dashboard />
		</TopbarSidebar>
	);
};
