import {
	EmailExistQuery,
	EmailExistQueryVariables,
	SendCodeMutation,
	SendCodeMutationVariables,
	SigninMutation,
	SigninMutationVariables,
} from "__generated__/graphql";
import { useLazyQuery, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserContext } from "contexts/UserContext";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";
import { SIGNIN } from "graphql/mutations/authentication/Signin";
import { EMAIL_EXIST } from "graphql/query/common/EmailExist";
import { showErrorToast, showSuccessToast } from "helpers/showToast";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { Loader } from "lucide-react";
import { ChangeEvent, Fragment, lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Button, Input } from "ui";

import { validationSchema } from "./Signin.schema";
import { SigninFormValues } from "./Signin.types";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

type FormStates = "email" | "password";

type FormActions = "CHANGE_TO_PASSWORD";

const SigninStateMachine = new StateMachine<FormStates, FormActions>(
	"email",
	{ email: "email", password: "password" },
	{ CHANGE_TO_PASSWORD: "CHANGE_TO_PASSWORD" },
	{ email: { CHANGE_TO_PASSWORD: "password" } },
);

export const SigninForm = () => {
	const { t } = useTranslation();

	const { getUser } = useUserContext();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const navigate = useNavigate();

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		SigninStateMachine,
	);

	const defaultValues = { userEmail: "", userPassword: "" } satisfies SigninFormValues;

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setError,
		getValues,
		setValue,
	} = useForm<SigninFormValues>({
		defaultValues,
		resolver: yupResolver<SigninFormValues>(validationSchema(compareState(states.password))),
	});

	const [emailExist] = useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EMAIL_EXIST, {
		onCompleted: data => {
			if (data?.emailExist?.exist) {
				updateState(actions.CHANGE_TO_PASSWORD);
			} else {
				setError("userEmail", {
					type: "custom",
					message: t("page.signin.account.does_not_exist"),
				});
			}
		},
		onError: () => {
			showErrorToast(t("service.unknown_error"));
		},
	});

	const [sendCode] = useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, {
		onCompleted: async () => {
			showSuccessToast(t("toast.send_confirm_code.success"));
		},
		onError: () => {
			showErrorToast(t("toast.send_confirm_code.failure"));
		},
	});

	const [signin] = useMutation<SigninMutation, SigninMutationVariables>(SIGNIN, {
		onCompleted: async () => {
			await getUser();

			navigate(ROUTES.DASHBOARD);
		},
		onError: async error => {
			setError("userPassword", { type: "custom", message: error.message });

			if (error.message === "User not confirmed.") {
				const { userEmail } = getValues();

				await sendCode({ variables: { data: { email: userEmail, token } } });

				navigate(ROUTES.SIGNUP.CONFIRM, { state: { email: userEmail } });
			}
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userEmail, userPassword });

			return;
		}

		if (compareState(states.email)) {
			await emailExist({ variables: { data: { email: userEmail, token } } });
		}

		if (compareState(states.password)) {
			await signin({ variables: { data: { email: userEmail, password: userPassword, token } } });
		}

		setRefreshReCaptcha(r => !r);
	};

	const userNotConfirmed = errors.userPassword?.message === "User not confirmed.";

	return (
		<form
			className="flex flex-col"
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
				isDisabled={compareState(states.password)}
				data-testid="email-input"
				// error={errors.userEmail?.message}
				// react-hook-form doesn't support browser autofill
				// onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("userEmail", e.target.value)}
			/>

			{compareState(states.password) && (
				<Input
					className="mt-4"
					placeholder={t("common.password")}
					type="password"
					autoFocus
					data-testid="password-input"
					// error={errors.userPassword?.message}
					// {...register("userPassword")}
				/>
			)}

			<Button
				className="mt-4"
				isDisabled={isSubmitting}
				type="submit"
				data-testid="submit-button"
			>
				{isSubmitting && <Loader data-testid="button-loader" />}

				{!isSubmitting && compareState(states.email) && t("common.next")}

				{!isSubmitting && compareState(states.password) && !userNotConfirmed && t("common.sign_in")}

				{!isSubmitting &&
					compareState(states.password) &&
					userNotConfirmed &&
					t("common.sign_up_confirm")}
			</Button>
		</form>
	);
};
