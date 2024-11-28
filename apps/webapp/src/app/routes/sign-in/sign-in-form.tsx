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
import { IS_PRODUCTION } from "config/env";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { useMutationUserSignin } from "graphql/user/useMutationUserSignin";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { lazy, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SignInFormSchema, signInFormSchema } from "./sign-in-form-schema";

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
	const navigate = useNavigate();

	const { getUser } = useUserContext();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		SignInStateMachine,
	);

	const defaultValues = { userEmail: "", userPassword: "" } satisfies SignInFormSchema;

	const form = useForm<SignInFormSchema>({
		defaultValues,
		resolver: zodResolver(signInFormSchema(compareState(states.password), t)),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		/* getValues, */
	} = form;

	const [emailExist] = useLazyQueryUserEmailExist({
		onCompleted: data => {
			if (data?.emailExist?.exist) {
				updateState(actions.CHANGE_TO_PASSWORD);
			} else {
				setError("userEmail", {
					type: "custom",
					message: t("api.account-not-found"),
				});
			}
		},
	});

	const [signin] = useMutationUserSignin({
		onCompleted: async () => {
			await getUser();

			navigate(paths.portfolios);
		},
		onError: async error => {
			setError("userPassword", { type: "custom", message: error.message });

			/* if (error.message === "api.account-not-confirmed") {
				const { userEmail } = getValues();

				await sendCode({ variables: { data: { email: userEmail, token } } });

				navigate(paths.signUp.confirm, { state: { email: userEmail } });
			} */
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userEmail, userPassword }: SignInFormSchema) => {
		if (!token && IS_PRODUCTION) {
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

	const accountNotConfirmed = errors.userPassword?.message === "api.account-not-confirmed";

	return (
		<Form {...form}>
			<form
				className="mt-5 flex flex-col gap-4"
				onSubmit={handleSubmit(onSubmit)}
			>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>

				<FormField
					control={control}
					name="userEmail"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									aria-label={t("form.email.label")}
									placeholder={t("form.email.label")}
									data-testid="email-input"
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
										aria-label={t("form.password.label")}
										placeholder={t("form.password.label")}
										data-testid="password-input"
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

					{compareState(states.email) && t("form.next")}

					{compareState(states.password) && !accountNotConfirmed && t("page.homepage.sign-in")}

					{compareState(states.password) && accountNotConfirmed && t("common.sign_up_confirm")}
				</Button>
			</form>
		</Form>
	);
};

export { SignInForm };
