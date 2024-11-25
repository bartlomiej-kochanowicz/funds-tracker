import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	emitSuccessToast,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loader,
	Separator,
	Text,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "assets/logo/logo.svg?react";
import LogoDark from "assets/logo/logo-dark.svg?react";
import AppleLogo from "assets/social/apple.svg?react";
import GoogleLogo from "assets/social/google.svg?react";
import { IS_PRODUCTION } from "config/env";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { lazy, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { LoginFormSchema, loginFormSchema } from "./login-form-schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

type FormStates = "email" | "password";

type FormActions = "CHANGE_TO_PASSWORD";

const LoginStateMachine = new StateMachine<FormStates, FormActions>(
	"email",
	{ email: "email", password: "password" },
	{ CHANGE_TO_PASSWORD: "CHANGE_TO_PASSWORD" },
	{ email: { CHANGE_TO_PASSWORD: "password" } },
);

type Props = {
	asModal?: boolean;
};

const Login = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const { t } = useTranslation();
	const { getUser } = useUserContext();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		LoginStateMachine,
	);

	const handleOpenChange = () => {
		if (state) {
			navigate(-1);
		}
	};

	const defaultValues = { userEmail: "", userPassword: "" } satisfies LoginFormSchema;

	const form = useForm<LoginFormSchema>({
		defaultValues,
		resolver: zodResolver(loginFormSchema(compareState(states.password), t)),
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
		onError: e => {
			// console.log("@@@", e.message);
			/* toast({
				status: "error",
				title: t("api.error"),
				description: t("api.unknown_error"),
			}); */
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userEmail, userPassword }: LoginFormSchema) => {
		if (!token && IS_PRODUCTION) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userEmail, userPassword });

			return;
		}

		if (compareState(states.email)) {
			await emailExist({ variables: { data: { email: userEmail, token } } });
		}

		/* if (compareState(states.password) && userPassword) {
			await signin({ variables: { data: { email: userEmail, password: userPassword, token } } });
		} */

		setRefreshReCaptcha(r => !r);
	};

	const userNotConfirmed = errors.userPassword?.message === "api.user-not-confirmed";

	return (
		<Dialog
			open
			onOpenChange={handleOpenChange}
		>
			<DialogContent
				showClose={!!state}
				mobileFullScreen
			>
				<div className="mx-auto max-w-96">
					<Logo className="light:hidden mx-auto size-10" />
					<LogoDark className="mx-auto size-10 dark:hidden" />

					<div className="flex h-[calc(100svh-104px)] items-center sm:h-auto">
						<div>
							<DialogHeader className="mb-10 sm:my-10">
								<DialogTitle>{t("page.login.title")}</DialogTitle>
								<DialogDescription>{t("page.login.description")}</DialogDescription>
							</DialogHeader>

							<div className="my-5 flex flex-col gap-5">
								<Button variant="white">
									<GoogleLogo />
									{t("page.login.login-with-google")}
								</Button>
								<Button variant="white">
									<AppleLogo />
									{t("page.login.login-with-apple")}
								</Button>
							</div>

							<Separator>
								<Text muted>{t("common.or")}</Text>
							</Separator>

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
															aria-label={t("form.password")}
															placeholder={t("form.password")}
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

										{compareState(states.password) && !userNotConfirmed && t("common.sign_in")}

										{compareState(states.password) &&
											userNotConfirmed &&
											t("common.sign_up_confirm")}
									</Button>
								</form>
							</Form>
							<Button
								variant="outline"
								className="mt-5 w-full"
								asChild
							>
								<Link to={paths.resetPassword}>{t("page.login.forgot-password")}</Link>
							</Button>
							<Text
								muted
								className="mt-10 block text-xs sm:mb-10"
							>
								<Trans
									i18nKey="page.login.do-not-have-an-account"
									components={{
										register: (
											<Link
												to={paths.register.register}
												className="text-primary"
											/>
										),
									}}
								/>
							</Text>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export { Login };
