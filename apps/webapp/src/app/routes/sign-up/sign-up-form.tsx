import { Button, Form, Loader } from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { IS_PRODUCTION } from "config/env";
import { paths } from "config/paths";
import { useLazyQueryUserEmailExist } from "graphql/user/useLazyQueryUserEmailExist";
import { useMutationUserSignup } from "graphql/user/useMutationUserSignup";
import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { createSearchParams, useNavigate } from "react-router-dom";

import { SignUpFormSchema, signUpFormSchema } from "./sign-up-form-schema";
import { SignUpNameAndEmail } from "./sign-up-name-and-email";
import { SignUpPasswords } from "./sign-up-passwords";

type FormStates = "nameAndEmail" | "passwords";

type FormActions = "CHANGE_TO_PASSWORDS";

const SignupStateMachine = new StateMachine<FormStates, FormActions>(
	"nameAndEmail",
	{ nameAndEmail: "nameAndEmail", passwords: "passwords" },
	{ CHANGE_TO_PASSWORDS: "CHANGE_TO_PASSWORDS" },
	{ nameAndEmail: { CHANGE_TO_PASSWORDS: "passwords" } },
);

const SignUpForm = () => {
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
		userPasswordConfirm: "",
	} satisfies SignUpFormSchema;

	const form = useForm<SignUpFormSchema>({
		defaultValues,
		resolver: zodResolver(signUpFormSchema({ isPasswordsStep: compareState(states.passwords), t })),
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
				setError("userEmail", { type: "custom", message: t("api.email-already-in-use") });
			} else {
				updateState(actions.CHANGE_TO_PASSWORDS);
			}
		},
	});

	const [signup] = useMutationUserSignup({
		onCompleted: async data => {
			if (data.signUpLocal.success) {
				const { userEmail } = getValues();

				navigate({
					pathname: paths.signUp.confirm,
					search: createSearchParams({
						email: userEmail,
					}).toString(),
				});
			}
		},
	});

	const onVerify = useCallback(setToken, [setToken]);

	const onSubmit = async ({ userName, userEmail, userPassword }: SignUpFormSchema) => {
		if (!token && IS_PRODUCTION) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userName, userEmail, userPassword });

			return;
		}

		if (compareState(states.nameAndEmail)) {
			await emailExist({ variables: { data: { email: userEmail, token } } });

			return;
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
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>

				{compareState(states.nameAndEmail) && <SignUpNameAndEmail />}

				{compareState(states.passwords) && <SignUpPasswords />}

				<Button
					disabled={isSubmitting}
					type="submit"
				>
					{isSubmitting && <Loader className="mr-2" />}
					{compareState(states.nameAndEmail) && t("form.next")}
					{compareState(states.passwords) && t("form.sign-up")}
				</Button>
			</form>
		</Form>
	);
};

export { SignUpForm };
