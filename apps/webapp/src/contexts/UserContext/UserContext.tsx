import { GetUserQuery, IntroductionStep, UpdateUserInput } from "__generated__/graphql";
import { LazyQueryExecFunction, OperationVariables } from "@apollo/client";
import { emitErrorToast, emitSuccessToast } from "@funds-tracker/ui";
import { IS_DEVELOPMENT } from "config/env";
import { isUserLoggedIn } from "helpers/isUserLoggedIn";
import { useLazyQueryUser } from "hooks/api/user/useLazyQueryUser";
import { useMutationUserUpdate } from "hooks/api/user/useMutationUserUpdate";
import LogRocket from "logrocket";
import { createContext, FC, ReactNode, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

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
	const { t } = useTranslation();
	const [getUser, { loading, data, client, error, updateQuery }] = useLazyQueryUser();
	const [updateUserMutation, { loading: updateLoading }] = useMutationUserUpdate();

	const updateUser = async ({ defaultCurrency, email, name }: UpdateLocalUserData) => {
		try {
			await updateUserMutation({
				variables: {
					data: {
						defaultCurrency,
						email,
						name,
					},
				},
			});

			updateQuery(prev => ({
				...prev,
				user: {
					...prev.user,
					defaultCurrency: defaultCurrency ?? prev.user.defaultCurrency,
					email: email ?? prev.user.email,
					name: name ?? prev.user.name,
				},
			}));

			const getSuccesMessage = () => {
				if (defaultCurrency) {
					return t("toast.user.update.defaultCurrency.success");
				}

				if (email) {
					return t("toast.user.update.email.success");
				}

				if (name) {
					return t("toast.user.update.name.success");
				}

				return t("toast.user.update.unknown.success");
			};

			emitSuccessToast(getSuccesMessage());
		} catch {
			emitErrorToast(t("service.unknown_error"));
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
