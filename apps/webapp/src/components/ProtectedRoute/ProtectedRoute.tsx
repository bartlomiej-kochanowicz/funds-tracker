import { useUserContext } from "contexts/UserContext";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface ProtectedRouteProps {
	children: JSX.Element;
	to?: string;
}

export const ProtectedRoute = ({ children, to = ROUTES.SIGNIN }: ProtectedRouteProps) => {
	const { user, loading } = useUserContext();

	const isAuthenticated = Boolean(!loading && user);

	if (loading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to={to} />;
	}

	return children;
};
