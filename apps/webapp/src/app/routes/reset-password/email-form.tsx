import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Loader,
	Text,
	useToast,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutationUserResetPassword } from "graphql/user/useMutationUserResetPassword";
import { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type EmailFormSchema, emailFormSchema } from "./email-form-schema";

const EmailForm = () => {
	const { t } = useTranslation();
	const { toast } = useToast();

	const [sendEmailSuccess, setSendEmailSuccess] = useState<boolean>(false);

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

	const onVerify = useCallback(setToken, [setToken]);

	const defaultValues = { userEmail: "" } satisfies EmailFormSchema;

	const form = useForm<EmailFormSchema>({
		defaultValues,
		resolver: zodResolver(emailFormSchema({ t })),
	});

	const {
		handleSubmit,
		formState: { isSubmitting },
		control,
		setError,
	} = form;

	const [resetPassword] = useMutationUserResetPassword({
		onCompleted: async () => {
			toast({
				variant: "success",
				title: t("toast.reset-password.title"),
				description: t("toast.reset-password.description"),
			});

			setSendEmailSuccess(true);
		},
		onError: error => {
			setError("userEmail", {
				type: "custom",
				message: t([error.message, "api.generic-error"]),
			});
		},
	});

	const onSubmit = async ({ userEmail }: EmailFormSchema) => {
		if (!token) {
			setRefreshReCaptcha(r => !r);

			onSubmit({ userEmail });

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
				{t("page.reset-password.reset-email-sent")}
			</Text>
		);
	}

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

				<FormField
					control={control}
					name="userEmail"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									autoFocus
									aria-label={t("form.reset-password-email.label")}
									placeholder={t("form.reset-password-email.label")}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					disabled={isSubmitting}
					type="submit"
					data-testid="submit-button"
				>
					{isSubmitting && <Loader className="mr-2" />}

					{t("page.reset-password.send-reset-link")}
				</Button>
			</form>
		</Form>
	);
};

export { EmailForm };
