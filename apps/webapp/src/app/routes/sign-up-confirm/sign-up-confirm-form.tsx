import {
	Button,
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@funds-tracker/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	type SignUpConfirmFormSchema,
	signUpConfirmFormSchema,
} from "./sign-up-confirm-form-schema";

const SignUpConfirmForm = () => {
	const { t } = useTranslation();

	const form = useForm<SignUpConfirmFormSchema>({
		resolver: zodResolver(signUpConfirmFormSchema({ t })),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = (data: SignUpConfirmFormSchema) => {
		console.log(data.code);
		/* toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		}); */
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem className="flex flex-col items-center justify-center text-center">
							<FormLabel>{t("form.code.label")}</FormLabel>
							<FormControl>
								<InputOTP
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
							<FormDescription>{t("form.code.description")}</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					className="mt-10 w-full"
					type="submit"
				>
					{t("form.submit")}
				</Button>
			</form>
		</Form>
	);
};

export { SignUpConfirmForm };
