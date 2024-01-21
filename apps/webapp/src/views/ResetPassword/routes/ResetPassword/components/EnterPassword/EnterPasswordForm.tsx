import { SetNewPasswordMutation, SetNewPasswordMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Loader, Text } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { SET_NEW_PASSWORD } from "graphql/mutations/authentication/SetNewPassword";
import { showErrorToast } from "helpers/showToast";
import { FC, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { validationSchema } from "./EnterPassword.schema";

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
	};

	const form = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const {
		control,
		handleSubmit,
		formState: { isSubmitting },
		setError,
	} = form;

	const [setNewPasswordMutation] = useMutation<
		SetNewPasswordMutation,
		SetNewPasswordMutationVariables
	>(SET_NEW_PASSWORD, {
		onCompleted: () => {
			setNewPasswordSuccess(true);
		},
		onError: a => {
			const message = a.message || t("service.unknown_error");

			setError("userPassword", { type: "custom", message });
			setError("userPasswordConfirmation", { type: "custom", message: "‎" });
			showErrorToast(message);
		},
	});

	const onSubmit = async ({ userPassword }: typeof defaultValues) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userPassword } as typeof defaultValues);

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
