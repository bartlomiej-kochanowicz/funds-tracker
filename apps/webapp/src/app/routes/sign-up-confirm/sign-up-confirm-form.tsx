import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
	useToast,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { IS_PRODUCTION } from "config/env";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { useMutationUserConfirmSignup } from "graphql/user/useMutationUserConfirmSignup";
import { useCallback, useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
	type SignUpConfirmFormSchema,
	signUpConfirmFormSchema,
} from "./sign-up-confirm-form-schema";

type Props = {
	email: string;
};

const SignUpConfirmForm = ({ email }: Props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [token, setToken] = useState<string>("");
	const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);
	const [showSendCodeButton, setShowSendCodeButton] = useState<boolean>(false);
	const { getUser } = useUserContext();

	const { toast } = useToast();

	const form = useForm<SignUpConfirmFormSchema>({
		resolver: zodResolver(signUpConfirmFormSchema({ t })),
		defaultValues: {
			code: "",
		},
	});

	const {
		setError,
		formState: { isSubmitting },
	} = form;

	const [confirmSignup] = useMutationUserConfirmSignup({
		onCompleted: async () => {
			await getUser();

			toast({
				variant: "success",
				title: t("toast.sign-up-confirm.title"),
				description: t("toast.sign-up-confirm.description"),
			});

			navigate(paths.dashboard);
		},
		onError: error => {
			setError("code", {
				type: "custom",
				message: t([error.message, "api.generic-error"]),
			});

			setShowSendCodeButton(error.message === "api.wrong-confirmation-code");
		},
	});

	const onSubmit = async (data: SignUpConfirmFormSchema) => {
		if (!token && IS_PRODUCTION) {
			setRefreshReCaptcha(r => !r);

			await onSubmit(data);
		}

		await confirmSignup({ variables: { data: { code: data.code, email, token } } });

		setRefreshReCaptcha(r => !r);
	};

	const onVerify = useCallback(setToken, [setToken]);

	// TODO
	const handleResendCode = () => {};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<GoogleReCaptcha
					onVerify={onVerify}
					refreshReCaptcha={refreshReCaptcha}
				/>

				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem
							className="mb-10 flex flex-col items-center justify-center text-center"
							aria-label={t("form.code.label")}
						>
							<FormControl>
								<InputOTP
									aria-label={t("form.code.label")}
									maxLength={6}
									{...field}
								>
									<InputOTPGroup>
										<InputOTPSlot index={0} />
										<InputOTPSlot index={1} />
										<InputOTPSlot index={2} />
									</InputOTPGroup>
									<InputOTPSeparator />
									<InputOTPGroup>
										<InputOTPSlot index={3} />
										<InputOTPSlot index={4} />
										<InputOTPSlot index={5} />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage />
							<FormDescription className="max-w-[320px]">
								{t("form.code.description")} <strong>{email}</strong>.
							</FormDescription>
						</FormItem>
					)}
				/>

				{showSendCodeButton && (
					<Button
						className="w-full"
						variant="outline"
						onClick={handleResendCode}
					>
						{t("page.sign-up-confirm.resend-code")}
					</Button>
				)}

				<Button
					className="mt-2 w-full"
					disabled={isSubmitting}
					type="submit"
				>
					{t("form.submit")}
				</Button>
			</form>
		</Form>
	);
};

export { SignUpConfirmForm };
