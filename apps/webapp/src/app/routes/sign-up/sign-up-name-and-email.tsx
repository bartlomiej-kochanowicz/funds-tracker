import { FormControl, FormField, FormItem, FormMessage, Input } from "@funds-tracker/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignUpFormSchema } from "./sign-up-form-schema";

const SignUpNameAndEmail = () => {
	const { t } = useTranslation();

	const { control } = useFormContext<SignUpFormSchema>();

	return (
		<Fragment>
			<FormField
				control={control}
				name="userName"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								aria-label={t("form.name.label")}
								placeholder={t("form.name.label")}
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name="userEmail"
				render={({ field }) => (
					<FormItem>
						<FormControl>
							<Input
								aria-label={t("form.email.label")}
								placeholder={t("form.email.label")}
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

export { SignUpNameAndEmail };
