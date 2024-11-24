import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
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
import { useUserContext } from "contexts/UserContext";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

const Login = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { getUser } = useUserContext();
	const { toast } = useToast();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		LoginStateMachine,
	);

	const handleOpenChange = () => {
		navigate(-1);
	};

	const defaultValues = { userEmail: "", userPassword: "" } satisfies LoginFormSchema;

	const form = useForm<LoginFormSchema>({
		defaultValues,
		resolver: zodResolver(loginFormSchema(compareState(states.password))),
	});

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		getValues,
	} = form;

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userEmail, userPassword }: LoginFormSchema) => {
		/* if (!token) {
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

		setRefreshReCaptcha(r => !r); */
	};

	return (
		<Dialog
			open
			onOpenChange={handleOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{t("page.login.title")}</DialogTitle>
					<DialogDescription>{t("page.login.description")}</DialogDescription>
				</DialogHeader>
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
											aria-label={t("form.email")}
											placeholder={t("form.email")}
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

							{/* {compareState(states.password) && !userNotConfirmed && t("common.sign_in")}

							{compareState(states.password) && userNotConfirmed && t("common.sign_up_confirm")} */}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export { Login };
