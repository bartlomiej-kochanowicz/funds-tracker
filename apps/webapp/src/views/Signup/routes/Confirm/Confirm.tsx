import { SendCodeMutation, SendCodeMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import { ThemeSwitcher } from "components";
import { ButtonLink, Heading, Link, Spacer } from "components/atoms";
import { LangSelector } from "components/molecules";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { ClearCentered } from "layouts/ClearCentered";
import { lazy, Suspense, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Text } from "ui";

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

			<Heading $textAlign="center">{t("common.sign_up_confirm")}</Heading>

			<Spacer $space="0.5" />

			<Text className="text-center text-sm text-gray-400">
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

			<Spacer $space="1.5" />

			<ConfirmForm email={email} />

			<Spacer />

			<Text className="text-center text-sm text-gray-400">
				<Trans
					i18nKey="page.confirm.support"
					components={{
						support: (
							<Link
								href="mailto:support@funds-tracker.com"
								$fontColor="blue"
							/>
						),
						code: (
							<ButtonLink
								onClick={handleResendCode}
								$fontColor="blue"
								data-testid="resend-code-button"
							/>
						),
					}}
				/>
			</Text>

			<Spacer $space="1.5" />

			<Spacer $space="1.5" />

			<div className="flex flex-col items-center">
				<LangSelector />

				<Spacer />

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
