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
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import { useMutationUserSetNewPassword } from "graphql/user/useMutationUserSetNewPassword";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
		onError: a => {
			const message = a.message || t("api.unknown_error");

			setError("userPassword", { type: "custom", message });
			setError("userPasswordConfirm", { type: "custom", message: EMPTY_VALIDATION_MESSAGE });
			// emitErrorToast(message);
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
		return "test";
		/* return (
			<Text className="text-center text-sm text-gray-400">
				<Trans
					i18nKey="page.forgot_password.enter_password.submit.success"
					components={{
						signin: (
							<Link
								to={ROUTES.SIGNIN}
								className="text-blue-500 hover:underline"
							/>
						),
					}}
				/>
			</Text>
		); */
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
							<FormControl>
								<Input
									autoFocus
									type="password"
									aria-label={t("form.reset-password-password.label")}
									placeholder={t("form.reset-password-password.label")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
					name="userPasswordConfirm"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									type="password"
									aria-label={t("form.confirm-password.label")}
									placeholder={t("form.confirm-password.label")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isSubmitting}
					type="submit"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{t("common.save")}
				</Button>
			</form>
		</Form>
	);
};

export { NewPasswordForm };
