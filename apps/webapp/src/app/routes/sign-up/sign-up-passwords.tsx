import { FormControl, FormField, FormItem, FormMessage, Input } from "@funds-tracker/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignUpFormSchema } from "./sign-up-form-schema";

export const SignUpPasswords = () => {
	const { t } = useTranslation();

	const { control } = useFormContext<SignUpFormSchema>();

	return (
		<Fragment>
			<FormField
				control={control}
				name="userPassword"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								type="password"
								autoFocus
								aria-label={t("common.password")}
								placeholder={t("common.password")}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name="userPasswordConfirmation"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								type="password"
								aria-label={t("page.signup.password.confirm")}
								placeholder={t("page.signup.password.confirm")}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
		</Fragment>
	);
};
