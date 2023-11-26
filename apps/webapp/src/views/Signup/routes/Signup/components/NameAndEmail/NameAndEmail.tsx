import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Input } from "ui";

import { SignupFormValues } from "../../Signup.types";

export const NameAndEmail = () => {
	const { t } = useTranslation();

	const {
		register,
		formState: { errors },
	} = useFormContext<SignupFormValues>();

	return (
		<Fragment>
			<Input
				placeholder={t("common.name")}
				aria-label={t("common.name")}
				type="text"
				isInvalid={!!errors.userName}
				errorMessage={errors.userName?.message}
				{...register("userName")}
			/>

			<Input
				placeholder={t("common.email")}
				aria-label={t("common.email")}
				type="text"
				isInvalid={!!errors.userEmail}
				errorMessage={errors.userEmail?.message}
				{...register("userEmail")}
			/>
		</Fragment>
	);
};
