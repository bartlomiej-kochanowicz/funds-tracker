import { Input } from "@faunds-tracker/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignupFormValues } from "../../Signup.types";

export const Passwords = () => {
	const { t } = useTranslation();

	const {
		register,
		formState: { errors },
	} = useFormContext<SignupFormValues>();

	return (
		<Fragment>
			<Input
				placeholder={t("common.password")}
				aria-label={t("common.password")}
				type="password"
				autoFocus
				isInvalid={!!errors.userPassword}
				errorMessage={errors.userPassword?.message}
				{...register("userPassword")}
			/>

			<Input
				placeholder={t("page.signup.password.confirm")}
				aria-label={t("page.signup.password.confirm")}
				type="password"
				isInvalid={!!errors.userPasswordConfirmation}
				errorMessage={errors.userPasswordConfirmation?.message}
				{...register("userPasswordConfirmation")}
			/>
		</Fragment>
	);
};
