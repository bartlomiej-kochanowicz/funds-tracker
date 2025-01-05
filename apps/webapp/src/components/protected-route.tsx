import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { Navigate } from "react-router-dom";

type Props = {
	children: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
	const { user, loading } = useUserContext();

	const isAuthenticated = Boolean(!loading && user);

	if (loading) {
		return null;
	}

	if (!isAuthenticated) {
		return <Navigate to={paths.homepage} />;
	}

	return children;
};

export { ProtectedRoute };
