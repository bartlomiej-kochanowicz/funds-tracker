import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { Navigate } from "react-router-dom";

type Props = {
	children: JSX.Element;
	to?: string;
};

const ProtectedRoute = ({ children, to = paths.homepage }: Props) => {
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

export { ProtectedRoute };
