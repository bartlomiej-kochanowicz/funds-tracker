import { Button, emitErrorToast, Form, Loader } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { useMutationUserSignup } from "graphql/user/useMutationUserSignup";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { lazy, Suspense, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { NameAndEmail } from "./components/NameAndEmail";
import { Passwords } from "./components/Passwords";
import { SignupFormSchema, SignupFormSchemaType } from "./SignupFormSchema";

const GoogleReCaptcha = lazy(() =>
	import("react-google-recaptcha-v3").then(({ GoogleReCaptcha: component }) => ({
		default: component,
	})),
);

type FormStates = "nameAndEmail" | "passwords";

type FormActions = "CHANGE_TO_PASSWORDS";

const SignupStateMachine = new StateMachine<FormStates, FormActions>(
	"nameAndEmail",
	{ nameAndEmail: "nameAndEmail", passwords: "passwords" },
	{ CHANGE_TO_PASSWORDS: "CHANGE_TO_PASSWORDS" },
	{ nameAndEmail: { CHANGE_TO_PASSWORDS: "passwords" } },
);

export const SignupForm = () => {
	const { t } = useTranslation();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
		SignupStateMachine,
	);

	const navigate = useNavigate();

	const defaultValues = {
		userName: "",
		userEmail: "",
		userPassword: "",
		userPasswordConfirmation: "",
	} satisfies SignupFormSchemaType;

	const form = useForm<SignupFormSchemaType>({
		defaultValues,
		resolver: yupResolver(SignupFormSchema(compareState(states.passwords))),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		setError,
		getValues,
	} = form;

	const [emailExist] = useLazyQueryUserEmailExist({
		onCompleted: data => {
			if (data.emailExist.exist) {
				setError("userEmail", { type: "custom", message: t("page.signup.email.already_in_use") });
			} else {
				updateState(actions.CHANGE_TO_PASSWORDS);
			}
		},
		onError: () => {
			emitErrorToast(t("api.unknown_error"));
		},
	});

	const [signup] = useMutationUserSignup({
		onCompleted: async data => {
			if (data.signupLocal.success) {
				const { userEmail } = getValues();

				navigate(ROUTES.SIGNUP.CONFIRM, { state: { email: userEmail } });
			} else {
				setError("userPassword", { type: "custom", message: t("api.unknown_error") });
				setError("userPasswordConfirmation", {
					type: "custom",
					message: EMPTY_VALIDATION_MESSAGE,
				});
			}
		},
		onError: () => {
			const message = t("api.unknown_error");

			setError("userPassword", { type: "custom", message });
			setError("userPasswordConfirmation", {
				type: "custom",
				message: EMPTY_VALIDATION_MESSAGE,
			});

			emitErrorToast(message);
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userName, userEmail, userPassword }: SignupFormSchemaType) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userName, userEmail, userPassword });

			return;
		}

		if (compareState(states.nameAndEmail)) {
			emailExist({ variables: { data: { email: userEmail, token } } });
		}

		if (compareState(states.passwords) && userPassword) {
			await signup({
				variables: { data: { name: userName, email: userEmail, password: userPassword, token } },
			});
		}

		setRefreshReCaptcha(r => !r);
	};

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

				{compareState(states.nameAndEmail) && <NameAndEmail />}

				{compareState(states.passwords) && <Passwords />}

				<Button
					disabled={isSubmitting}
					type="submit"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{compareState(states.nameAndEmail) && t("common.next")}

					{compareState(states.passwords) && t("common.sign_up")}
				</Button>
			</form>
		</Form>
	);
};
