import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type Props = {
	children: ReactElement;
	to?: string;
};

const PublicRoute = ({ children, to = paths.homepage }: Props) => {
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

export { PublicRoute };
