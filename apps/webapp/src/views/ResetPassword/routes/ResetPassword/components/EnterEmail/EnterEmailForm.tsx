import { ResetPasswordMutation, ResetPasswordMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Loader, Spacer } from "components/atoms";
import { RESET_PASSWORD } from "graphql/mutations/authentication/ResetPassword";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { ChangeEvent, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Text } from "ui";

import { validationSchema } from "./EnterEmail.schema";
import { Form } from "./EnterEmail.styles";

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
		setValue,
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
			<Text className="text-center text-sm text-gray-400">
				{t("page.forgot_password.enter_email.submit.success")}
			</Text>
		);
	}

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			noValidate
		>
			<Suspense>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>
			</Suspense>

			<Input
				placeholder={t("common.email")}
				type="email"
				data-testid="email-input"
				onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("userEmail", e.target.value)}
				error={errors.userEmail?.message}
			/>

			<Spacer />

			<Button
				className="w-auto"
				isDisabled={isSubmitting}
				type="submit"
				data-testid="submit-button"
			>
				{isSubmitting && (
					<Loader
						$color="white"
						data-testid="button-loader"
					/>
				)}

				{!isSubmitting && t("page.forgot_password.enter_email.submit.button")}
			</Button>
		</Form>
	);
};

EnterEmailForm.displayName = "EnterEmailForm";
