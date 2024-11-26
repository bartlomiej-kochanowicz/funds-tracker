import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loader,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { useMutationUserSendCode } from "graphql/user/useMutationUserSendCode";
import { useMutationUserSignin } from "graphql/user/useMutationUserSignin";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { type SignInFormSchema, signInFormSchema } from "./sign-in-form-schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

type FormStates = "email" | "password";

type FormActions = "CHANGE_TO_PASSWORD";

const SignInStateMachine = new StateMachine<FormStates, FormActions>(
	"email",
	{ email: "email", password: "password" },
	{ CHANGE_TO_PASSWORD: "CHANGE_TO_PASSWORD" },
	{ email: { CHANGE_TO_PASSWORD: "password" } },
);

const SignInForm = () => {
	const { t } = useTranslation();

	const { getUser } = useUserContext();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const navigate = useNavigate();

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		SignInStateMachine,
	);

	const defaultValues = { userEmail: "", userPassword: "" } satisfies SignInFormSchema;

	const form = useForm<SignInFormSchema>({
		defaultValues,
		resolver: zodResolver(signInFormSchema(compareState(states.password))),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		getValues,
	} = form;

	const [emailExist] = useLazyQueryUserEmailExist({
		onCompleted: data => {
			if (data?.emailExist?.exist) {
				updateState(actions.CHANGE_TO_PASSWORD);
			} else {
				setError("userEmail", {
					type: "custom",
					message: t("page.signin.account.does_not_exist"),
				});
			}
		},
		onError: () => {
			/* toast({
				status: "error",
				title: t("api.error"),
				description: t("api.unknown_error"),
			}); */
		},
	});

	const [sendCode] = useMutationUserSendCode({
		onCompleted: async () => {
			toast({
				desctiption: t("toast.send_confirm_code.success"),
			});
		},
		onError: () => {
			/* toast({
				status: "error",
				description: t("toast.send_confirm_code.failure")
			}); */
		},
	});

	const [signin] = useMutationUserSignin({
		onCompleted: async () => {
			await getUser();

			navigate(paths.portfolios);
		},
		onError: async error => {
			setError("userPassword", { type: "custom", message: error.message });

			if (error.message === "api.user-not-confirmed") {
				const { userEmail } = getValues();

				await sendCode({ variables: { data: { email: userEmail, token } } });

				navigate(paths.signUp.confirm, { state: { email: userEmail } });
			}
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userEmail, userPassword }: SignInFormSchema) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userEmail, userPassword });

			return;
		}

		if (compareState(states.email)) {
			await emailExist({ variables: { data: { email: userEmail, token } } });
		}

		if (compareState(states.password) && userPassword) {
			await signin({ variables: { data: { email: userEmail, password: userPassword, token } } });
		}

		setRefreshReCaptcha(r => !r);
	};

	const userNotConfirmed = errors.userPassword?.message === "api.user-not-confirmed";

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Suspense>
					<GoogleReCaptcha
						onVerify={onVerify}
						refreshReCaptcha={refreshReCaptcha}
					/>
				</Suspense>

				<FormField
					control={control}
					name="userEmail"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									aria-label={t("common.email")}
									data-testid="email-input"
									placeholder={t("common.email")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{compareState(states.password) && (
					<FormField
						control={control}
						name="userPassword"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										autoFocus
										type="password"
										aria-label={t("common.password")}
										data-testid="password-input"
										placeholder={t("common.password")}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button
					disabled={isSubmitting}
					type="submit"
					data-testid="submit-button"
				>
					{isSubmitting && <Loader />}

					{compareState(states.email) && t("common.next")}

					{compareState(states.password) && !userNotConfirmed && t("common.sign_in")}

					{compareState(states.password) && userNotConfirmed && t("common.sign_up_confirm")}
				</Button>
			</form>
		</Form>
	);
};

export { SignInForm };
