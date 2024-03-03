import { GetUserQuery, IntroductionStep, UpdateUserInput } from "__generated__/graphql";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { IS_DEVELOPMENT } from "config/env";
import { isUserLoggedIn } from "helpers/isUserLoggedIn";
import { useLazyQueryUser } from "hooks/api/user/useLazyQueryUser";
import LogRocket from "logrocket";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";

type UpdateLocalUserData = UpdateUserInput & { introductionStep?: IntroductionStep };

type UserContextType = {
	loading: boolean;
	user: GetUserQuery["user"];
	getUser: LazyQueryExecFunction<GetUserQuery, OperationVariables>;
	clearUser: () => void;
	updateUser: (data: UpdateLocalUserData) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const useUser = (): UserContextType => {
	const [getUser, { loading, data, client, error, updateQuery }] = useLazyQueryUser();

	const updateUser = ({ defaultCurrency, email, name, introductionStep }: UpdateLocalUserData) => {
		updateQuery(prev => ({
			...prev,
			user: {
				...prev.user,
				defaultCurrency: defaultCurrency ?? prev.user.defaultCurrency,
				email: email ?? prev.user.email,
				name: name ?? prev.user.name,
				introductionStep: introductionStep ?? prev.user.introductionStep,
			},
		}));
	};

	if (
		isUserLoggedIn &&
		!loading &&
		!data &&
		error?.message !== "Failed to fetch" &&
		error?.message !== "Refresh token failed" &&
		error?.message !== "Response not successful: Received status code 500"
	) {
		getUser();
	}

	const clearUser = () => {
		client.resetStore();
	};

	useEffect(() => {
		if (data && !IS_DEVELOPMENT) {
			const { uuid, name, email } = data.user;

			LogRocket.identify(uuid, {
				name,
				email,
			});
		}
	}, [data]);

	return {
		loading,
		user: data?.user ?? null,
		getUser,
		clearUser,
		updateUser,
	} as UserContextType;
};

type ProviderProps = {
	children: ReactNode;
};

export const UserContextProvider: FC<ProviderProps> = ({ children }) => {
	const value = useUser();

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
	const value = useContext(UserContext);

	if (!value) {
		throw new Error("useUserContext must be used inside UserContextProvider");
	}

	return value;
};
