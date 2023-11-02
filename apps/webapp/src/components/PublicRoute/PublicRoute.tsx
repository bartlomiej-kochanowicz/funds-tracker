import { useUserContext } from "contexts/UserContext";
import { FullscreenLoading } from "layouts/FullscreenLoading";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface PublicRouteProps {
	children: ReactNode;
	to?: string;
}

export const PublicRoute = ({ children, to = ROUTES.HOME }: PublicRouteProps) => {
	const { user, loading } = useUserContext();

	const isAuthenticated = !loading && user;

	if (loading) {
		return <FullscreenLoading />;
	}

	if (!isAuthenticated) {
		return <Navigate to={to} />;
	}

	return children;
};
