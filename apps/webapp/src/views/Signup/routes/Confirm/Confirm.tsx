import { SendCodeMutation, SendCodeMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { ThemeSwitcher } from "components";
import { ClearCentered } from "components/layouts/ClearCentered";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { lazy, Suspense, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Button, H1, Link, Text } from "ui";

import { ConfirmForm } from "./ConfirmForm";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

export const Confirm = () => {
	const { t } = useTranslation();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const location = useLocation();

	const email = location?.state?.email as string;

	const [sendCode] = useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, {
		onCompleted: () => {
			showSuccessToast(t("toast.send_confirm_code.success"));
		},
		onError: () => {
			showErrorToast(t("toast.send_confirm_code.failure"));
		},
	});

	const handleResendCode = useCallback(async () => {
		await sendCode({ variables: { data: { email, token } } });

		setRefreshReCaptcha(r => !r);
	}, [sendCode, email, token]);

	if (!email) {
		return (
			<Navigate
				to={ROUTES.SIGNIN}
				replace
			/>
		);
	}

	return (
		<ClearCentered>
			<Suspense>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>
			</Suspense>

			<H1 className="text-center">{t("common.sign_up_confirm")}</H1>

			<Text className="mb-6 mt-2 text-center text-sm text-gray-600">
				<Trans
					i18nKey="page.confirm.description"
					components={{
						bold: <Text className="text-center text-sm font-bold text-gray-400" />,
					}}
					values={{
						email,
					}}
				/>
			</Text>

			<ConfirmForm email={email} />

			<Text className="my-4 text-center text-sm text-gray-600">
				<Trans
					i18nKey="page.confirm.support"
					components={{
						support: <Link href="mailto:support@funds-tracker.com" />,
						code: (
							<Button
								size="xs"
								color="gray"
								onPress={handleResendCode}
								data-testid="resend-code-button"
							/>
						),
					}}
				/>
			</Text>

			<div className="mt-12 flex flex-col items-center">
				{/* <LangSelector /> */}

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
