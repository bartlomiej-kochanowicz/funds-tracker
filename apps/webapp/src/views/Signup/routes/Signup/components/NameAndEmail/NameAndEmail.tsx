import { Form, Input } from "@funds-tracker/ui";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { SignupFormSchemaType } from "../../SignupFormSchema";

export const NameAndEmail = () => {
	const { t } = useTranslation();

	const { control } = useFormContext<SignupFormSchemaType>();

	return (
		<Fragment>
			<Form.Field
				control={control}
				name="userName"
				render={({ field }) => (
					<Form.Item>
						<Form.Control>
							<Input
								aria-label={t("common.name")}
								placeholder={t("common.name")}
								{...field}
							/>
						</Form.Control>
						<Form.Message />
					</Form.Item>
				)}
			/>

			<Form.Field
				control={control}
				name="userEmail"
				render={({ field }) => (
					<Form.Item>
						<Form.Control>
							<Input
								aria-label={t("common.email")}
								placeholder={t("common.email")}
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
