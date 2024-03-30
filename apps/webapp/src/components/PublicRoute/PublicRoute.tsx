import { useUserContext } from "contexts/UserContext";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface PublicRouteProps {
	children: ReactElement;
	to?: string;
}

export const PublicRoute = ({ children, to = ROUTES.HOME }: PublicRouteProps) => {
	const { user, loading } = useUserContext();

	const isAuthenticated = !loading && user;

	if (loading) {
		return null;
	}

	if (isAuthenticated) {
		return (
			<Navigate
				to={to}
				replace
			/>
		);
	}

	return children;
};
