import { StateMachine, useStateMachine } from "hooks/useStateMachie";
import { TFunction } from "i18next";
import { z } from "zod";

type FormStates = "email" | "password" | "confirm";

type FormActions = "CHANGE_TO_PASSWORD" | "CHANGE_TO_CONFIRM";

const SignInStateMachine = new StateMachine<FormStates, FormActions>(
	"email",
	{ email: "email", password: "password", confirm: "confirm" },
	{ CHANGE_TO_PASSWORD: "CHANGE_TO_PASSWORD", CHANGE_TO_CONFIRM: "CHANGE_TO_CONFIRM" },
	{
		email: { CHANGE_TO_PASSWORD: "password" },
		password: { CHANGE_TO_CONFIRM: "confirm" },
		confirm: {
			CHANGE_TO_PASSWORD: "password",
		},
	},
);

const useFormState = () => useStateMachine<FormStates, FormActions>(SignInStateMachine);

const signInFormSchema = ({ t, isPasswordState }: { t: TFunction; isPasswordState: boolean }) =>
	z.object({
		userEmail: z
			.string()
			.email({ message: t("form.email.invalid") })
			.min(1, { message: t("form.email.required") }),
		userPassword: z.string().refine(
			val => {
				if (isPasswordState && (val.length < 8 || val.length > 32)) {
					return false;
				}

				return true;
			},
			{
				message: t("form.password.invalid"),
			},
		),
	});

type SignInFormSchema = z.infer<ReturnType<typeof signInFormSchema>>;

export {
	type FormActions,
	type FormStates,
	type SignInFormSchema,
	signInFormSchema,
	SignInStateMachine,
	useFormState,
};
