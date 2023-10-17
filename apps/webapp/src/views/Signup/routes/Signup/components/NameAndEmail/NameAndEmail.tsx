import { Input, Spacer } from "components/atoms";
import { ChangeEvent, Fragment } from "react";
import { DeepRequired, FieldErrorsImpl, UseFormSetValue } from "react-hook-form";
import { useTranslation } from "react-i18next";

type DefaultValues = {
	userName: string;
	userEmail: string;
	userPassword: string;
	userPasswordConfirmation: string;
};

interface NameAndEmailProps {
	setValue: UseFormSetValue<DefaultValues>;
	errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
}

export const NameAndEmail = ({ setValue, errors }: NameAndEmailProps) => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Input
				placeholder={t("common.name")}
				type="text"
				onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("userName", e.target.value)}
				error={errors.userName?.message}
			/>

			<Spacer />

			<Input
				placeholder={t("common.email")}
				type="text"
				onChange={(e: ChangeEvent<HTMLInputElement>) => setValue("userEmail", e.target.value)}
				error={errors.userEmail?.message}
			/>
		</Fragment>
	);
};
