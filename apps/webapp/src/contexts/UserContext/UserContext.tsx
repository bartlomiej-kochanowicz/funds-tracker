import { GetUserQuery, UpdateUserInput } from "__generated__/graphql";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
/* import { emitErrorToast, emitSuccessToast } from "@funds-tracker/ui"; */
import { IS_DEVELOPMENT } from "config/env";
import { useLazyQueryUser } from "graphql/user/useLazyQueryUser";
import { useMutationUserUpdate } from "graphql/user/useMutationUserUpdate";
import { isUserLoggedIn } from "helpers/isUserLoggedIn";
import LogRocket from "logrocket";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";

export type UserContextType = {
	loading: boolean;
	user: GetUserQuery["user"];
	getUser: LazyQueryExecFunction<GetUserQuery, OperationVariables>;
	clearUser: () => void;
	updateUser: (data: UpdateUserInput) => void;
};

const UserContext = createContext<UserContextType | null>(null);

const useUser = (): UserContextType => {
	const [getUser, { loading, data, client, error, updateQuery }] = useLazyQueryUser();
	const [updateUserMutation, { loading: updateLoading }] = useMutationUserUpdate();

	const updateUser = async ({ /* email, */ name }: UpdateUserInput) => {
		try {
			await updateUserMutation({
				variables: {
					data: {
						/* email, */
						name,
					},
				},
			});

			updateQuery(prev => ({
				...prev,
				user: {
					...prev.user,
					/* email: email ?? prev.user.email, */
					name: name ?? prev.user.name,
				},
			}));

			/* emitSuccessToast(t("toasts.data_saved")); */
		} catch {
			// TODO
			// emitErrorToast(t("toasts.error"));
		}
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
		loading: loading || updateLoading,
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
