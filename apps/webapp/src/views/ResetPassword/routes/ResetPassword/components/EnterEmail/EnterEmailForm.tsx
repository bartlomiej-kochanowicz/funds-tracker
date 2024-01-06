import { ResetPasswordMutation, ResetPasswordMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Input, Text } from "@faunds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { RESET_PASSWORD } from "graphql/mutations/authentication/ResetPassword";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { validationSchema } from "./EnterEmail.schema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

export const EnterEmailForm = () => {
	const { t } = useTranslation();

	const [sendEmailSuccess, setSendEmailSuccess] = useState<boolean>(false);

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const defaultValues = { userEmail: "" };

	const {
		handleSubmit,
		formState: { errors, isSubmitting },
		register,
	} = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const [resetPassword] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
		RESET_PASSWORD,
		{
			onCompleted: async () => {
				showSuccessToast(t("toast.send_reset_password_link.success"));

				setSendEmailSuccess(true);
			},
			onError: () => {
				showErrorToast(t("toast.send_reset_password_link.failure"));
			},
		},
	);

	const onSubmit = async ({ userEmail }: typeof defaultValues) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userEmail } as typeof defaultValues);

			return;
		}

		await resetPassword({
			variables: {
				data: {
					email: userEmail,
					token,
				},
			},
		});

		setRefreshReCaptcha(r => !r);
	};

	if (sendEmailSuccess) {
		return (
			<Text className="text-center text-sm italic text-gray-400">
				{t("page.forgot_password.enter_email.submit.success")}
			</Text>
		);
	}

	return (
		<form
			className="flex flex-col"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Suspense>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>
			</Suspense>

			<Input
				placeholder={t("common.email")}
				aria-label={t("common.email")}
				data-testid="email-input"
				isInvalid={!!errors.userEmail}
				errorMessage={errors.userEmail?.message}
				{...register("userEmail")}
			/>

			<Button
				className="w-auto"
				isDisabled={isSubmitting}
				isLoading={isSubmitting}
				type="submit"
				data-testid="submit-button"
			>
				{t("page.forgot_password.enter_email.submit.button")}
			</Button>
		</form>
	);
};

EnterEmailForm.displayName = "EnterEmailForm";
