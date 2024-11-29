import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loader,
	useToast,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { IS_PRODUCTION } from "config/env";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { useMutationUserSendCode } from "graphql/user/useMutationUserSendCode";
import { useMutationUserSignin } from "graphql/user/useMutationUserSignin";
import { lazy, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SignInFormSchema, signInFormSchema, useFormState } from "./sign-in-form-schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

const SignInForm = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const { getUser } = useUserContext();

	const { toast } = useToast();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const { states, actions, updateState, compareState } = useFormState();

	const defaultValues = { userEmail: "", userPassword: "" } satisfies SignInFormSchema;

	const form = useForm<SignInFormSchema>({
		defaultValues,
		resolver: zodResolver(
			signInFormSchema({
				t,
				isPasswordState: compareState(states.password),
			}),
		),
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setError,
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
			setError("userPassword", {
				type: "custom",
				message: t([error.message, "api.generic-error"]),
			});

			if (compareState(states.password) && error.message === "api.account-not-confirmed") {
				updateState(actions.CHANGE_TO_CONFIRM);
				setError("userEmail", {
					type: "custom",
					message: t("page.sign-in.account-not-confirmed-send-code"),
				});
			}
		},
	});

	const [sendCode] = useMutationUserSendCode({
		onCompleted: () => {
			toast({
				title: t("toast.send-confirm-code.completed.title"),
				description: t("toast.send-confirm-code.completed.description"),
			});

			navigate(paths.signUp.confirm);
		},
		onError: error => {
			toast({
				variant: "destructive",
				description: t([error.message, "api.generic-error"]),
			});
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

		if (compareState(states.password)) {
			await signin({ variables: { data: { email: userEmail, password: userPassword, token } } });
		}

		if (compareState(states.confirm)) {
			await sendCode({ variables: { data: { email: userEmail, token } } });
		}

		setRefreshReCaptcha(r => !r);
	};

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
									readOnly={compareState(states.confirm)}
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

					{compareState(states.password) && t("page.homepage.sign-in")}

					{compareState(states.confirm) && t("page.sign-in.send-confirmation-code")}
				</Button>
			</form>
		</Form>
	);
};

export { SignInForm };
