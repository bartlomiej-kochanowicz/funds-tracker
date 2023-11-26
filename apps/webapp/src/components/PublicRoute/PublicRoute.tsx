import { FullscreenLoading } from "components/layouts/FullscreenLoading";
import { useUserContext } from "contexts/UserContext";
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

	if (isAuthenticated) {
		<Navigate to={to} />;
	}

	return children;
};
