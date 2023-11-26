import { FullscreenLoading } from "components/layouts/FullscreenLoading";
import { RECAPTCHA_SITE_KEY } from "config/env";
import { useUserContext } from "contexts/UserContext";
import { FC } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Dashboard } from "views/Dashboard";
import { Signin } from "views/Signin/routes/Signin";

export const Home: FC = () => {
	const { user, loading } = useUserContext();

	const isAuthenticated = Boolean(!loading && user);

	if (loading) {
		return <FullscreenLoading />;
	}

	if (!isAuthenticated) {
		return (
			<GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
				<Signin />
			</GoogleReCaptchaProvider>
		);
	}

	return <Dashboard />;
};
