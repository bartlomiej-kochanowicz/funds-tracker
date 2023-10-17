import { IntroductionStep } from "__generated__/graphql";
import { useUserContext } from "contexts/UserContext";
import { FullscreenLoading } from "layouts/FullscreenLoading";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface ProtectedRouteProps {
	children: JSX.Element;
	to?: string;
}

export const ProtectedRoute = ({ children, to = ROUTES.SIGNIN }: ProtectedRouteProps) => {
	const { user, loading } = useUserContext();

	const location = useLocation();

	const isAuthenticated = Boolean(!loading && user);

	if (loading) {
		return <FullscreenLoading />;
	}

	if (
		isAuthenticated &&
		user.introductionStep !== IntroductionStep.Completed &&
		location.pathname !== ROUTES.INTRODUCTION
	) {
		return <Navigate to={ROUTES.INTRODUCTION} />;
	}

	return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = "ProtectedRoute";
