import { SendCodeMutation, SendCodeMutationVariables } from "__generated__/graphql";
import { useMutation } from "@apollo/client";
import {
	Button,
	buttonVariants,
	Card,
	emitErrorToast,
	emitSuccessToast,
	H1,
	Text,
} from "@funds-tracker/ui";
import { LangSelector } from "components/LangSelector";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeToggle } from "components/ThemeToggle";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { lazy, Suspense, useCallback, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Navigate, useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";

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
			emitSuccessToast(t("toast.send_confirm_code.success"));
		},
		onError: () => {
			emitErrorToast(t("toast.send_confirm_code.failure"));
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
			<Card>
				<Card.Header className="text-center">
					<H1>{t("common.sign_up_confirm")}</H1>

					<Text
						muted
						className="mb-6 mt-2 text-sm"
					>
						<Trans
							i18nKey="page.confirm.description"
							components={{
								bold: (
									<Text
										muted
										className="font-bold"
									/>
								),
							}}
							values={{
								email,
							}}
						/>
					</Text>
				</Card.Header>

				<Card.Content className="my-3">
					<ConfirmForm email={email} />
				</Card.Content>

				<Card.Footer>
					<Text
						muted
						className="text-center text-sm"
					>
						<Trans
							i18nKey="page.confirm.support"
							components={{
								support: (
									<a
										className={buttonVariants({ variant: "link", size: "sm" })}
										href="mailto:support@funds-tracker.com"
									/>
								),
								code: (
									<Button
										variant="link"
										onClick={handleResendCode}
										data-testid="resend-code-button"
									/>
								),
							}}
						/>
					</Text>
				</Card.Footer>
			</Card>

			<div className="mx-32 flex flex-col items-center">
				<LangSelector />

				<ThemeToggle />
			</div>
		</ClearCentered>
	);
};
