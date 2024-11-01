import { Button, emitErrorToast, Form, Input, Loader, Text } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import { useMutationUserSetNewPassword } from "hooks/api/user/useMutationUserSetNewPassword";
import { FC, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { EnterPasswordFormSchema, EnterPasswordFormSchemaType } from "./EnterPasswordFormSchema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

interface EnterPasswordFormProps {
	token: string;
}

export const EnterPasswordForm: FC<EnterPasswordFormProps> = ({ token: resetToken }) => {
	const { t } = useTranslation();

	const [newPasswordSuccess, setNewPasswordSuccess] = useState<boolean>(false);

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const defaultValues = {
		userPassword: "",
		userPasswordConfirmation: "",
	} satisfies EnterPasswordFormSchemaType;

	const form = useForm<EnterPasswordFormSchemaType>({
		defaultValues,
		resolver: yupResolver(EnterPasswordFormSchema),
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
			setError("userPasswordConfirmation", { type: "custom", message: EMPTY_VALIDATION_MESSAGE });
			emitErrorToast(message);
		},
	});

	const onSubmit = async ({
		userPassword,
		userPasswordConfirmation,
	}: EnterPasswordFormSchemaType) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userPassword, userPasswordConfirmation });

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

				<Form.Field
					control={control}
					name="userPassword"
					render={({ field }) => (
						<Form.Item>
							<Form.Control>
								<Input
									autoFocus
									type="password"
									aria-label={t("common.password")}
									placeholder={t("common.password")}
									{...field}
								/>
							</Form.Control>
							<Form.Message />
						</Form.Item>
					)}
				/>

				<Form.Field
					control={control}
					name="userPasswordConfirmation"
					render={({ field }) => (
						<Form.Item>
							<Form.Control>
								<Input
									type="password"
									aria-label={t("page.signup.password.confirm")}
									placeholder={t("page.signup.password.confirm")}
									{...field}
								/>
							</Form.Control>
							<Form.Message />
						</Form.Item>
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

EnterPasswordForm.displayName = "EnterPasswordForm";
