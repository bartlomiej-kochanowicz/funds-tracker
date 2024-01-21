import { Form, Input } from "@funds-tracker/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignupFormValues } from "../../Signup.types";

export const Passwords = () => {
	const { t } = useTranslation();

	const { control } = useFormContext<SignupFormValues>();

	return (
		<Fragment>
			<Form.Field
				control={control}
				name="userPassword"
				render={({ field }) => (
					<Form.Item>
						<Form.Control>
							<Input
								type="password"
								aria-label={t("common.password")}
								placeholder={t("common.password")}
								{...field}
							/>
						</Form.Control>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<Form.Field
				control={control}
				name="userPasswordConfirmation"
				render={({ field }) => (
					<Form.Item>
						<Form.Control>
							<Input
								type="password"
								aria-label={t("page.signup.password.confirm")}
								placeholder={t("page.signup.password.confirm")}
								{...field}
							/>
						</Form.Control>
						<Form.Message />
					</Form.Item>
				)}
			/>
		</Fragment>
	);
};
