import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loader,
	Text,
	useToggle,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { paths } from "config/paths";
import { useMutationUserSetNewPassword } from "graphql/user/useMutationUserSetNewPassword";
import { Eye, EyeOff } from "lucide-react";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { type NewPasswordFormSchema, newPasswordFormSchema } from "./new-password-form-schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

type Props = {
	token: string;
};

const NewPasswordForm = ({ token: resetToken }: Props) => {
	const { t } = useTranslation();

	const [newPasswordSuccess, setNewPasswordSuccess] = useState<boolean>(false);

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
	const [showPassword, toggleShowPassword] = useToggle();
	const [showPasswordConfirm, toggleShowPasswordConfirm] = useToggle();

	const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleShowPassword();
	};

	const handleShowPasswordConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		toggleShowPasswordConfirm();
	};

	const onVerify = useCallback(setToken, [setToken]);

	const defaultValues = {
		userPassword: "",
		userPasswordConfirm: "",
	} satisfies NewPasswordFormSchema;

	const form = useForm<NewPasswordFormSchema>({
		defaultValues,
		resolver: zodResolver(newPasswordFormSchema({ t })),
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setError,
	} = form;

	const [setNewPasswordMutation] = useMutationUserSetNewPassword({
		onCompleted: () => {
			setNewPasswordSuccess(true);
		},
		onError: error => {
			const message = t([error.message, "api.generic-error"]);

			setError("userPasswordConfirm", {
				type: "custom",
				message,
			});
		},
	});

	const onSubmit = async ({ userPassword, userPasswordConfirm }: NewPasswordFormSchema) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userPassword, userPasswordConfirm });

			return;
		}

		await setNewPasswordMutation({
			variables: {
				data: {
					token,
					resetToken,
					password: userPassword,
				},
			},
		});

		setRefreshReCaptcha(r => !r);
	};

	if (newPasswordSuccess) {
		return (
			<Text
				muted
				className="text-center text-sm italic"
			>
				<Trans
					i18nKey="page.reset-password.reset-completed"
					components={{
						"sign-in": (
							<Link
								to={paths.signIn}
								className="inline text-primary"
							/>
						),
					}}
				/>
			</Text>
		);
	}

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
					name="userPassword"
					render={({ field }) => (
						<FormItem>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<FormControl>
									<Input
										autoFocus
										type={showPassword ? "text" : "password"}
										aria-label={t("form.reset-password-password.label")}
										placeholder={t("form.reset-password-password.label")}
										{...field}
									/>
								</FormControl>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleShowPassword}
									className="text-muted-foreground"
									aria-label={t("form.password.toggle")}
								>
									{showPassword ? <EyeOff /> : <Eye />}
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="userPasswordConfirm"
					render={({ field }) => (
						<FormItem>
							<div className="flex w-full max-w-sm items-center space-x-2">
								<FormControl>
									<Input
										type={showPasswordConfirm ? "text" : "password"}
										aria-label={t("form.confirm-password.label")}
										placeholder={t("form.confirm-password.label")}
										{...field}
									/>
								</FormControl>
								<Button
									variant="ghost"
									size="icon"
									onClick={handleShowPasswordConfirm}
									className="text-muted-foreground"
									aria-label={t("form.confirm-password.toggle")}
								>
									{showPasswordConfirm ? <EyeOff /> : <Eye />}
								</Button>
							</div>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isSubmitting}
					type="submit"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{t("form.submit")}
				</Button>
			</form>
		</Form>
	);
};

export { NewPasswordForm };
