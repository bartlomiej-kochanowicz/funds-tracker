import { ResetPasswordMutation, ResetPasswordMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { Button, Form, Input, Loader, Text } from "@funds-tracker/ui";
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

	const form = useForm({
		defaultValues,
		resolver: yupResolver(validationSchema),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
	} = form;

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
			<Text
				muted
				className="flex justify-center text-center text-sm italic"
			>
				{t("page.forgot_password.enter_email.submit.success")}
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
					name="userEmail"
					render={({ field }) => (
						<Form.Item>
							<Form.Control>
								<Input
									autoFocus
									aria-label={t("common.email")}
									placeholder={t("common.email")}
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
					data-testid="submit-button"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{t("page.forgot_password.enter_email.submit.button")}
				</Button>
			</form>
		</Form>
	);
};

EnterEmailForm.displayName = "EnterEmailForm";
