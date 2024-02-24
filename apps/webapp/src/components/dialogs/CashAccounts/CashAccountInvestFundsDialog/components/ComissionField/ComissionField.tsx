import { Currency } from "__generated__/graphql";
import { Form, NumberInput, useUpdateEffect } from "@funds-tracker/ui";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

interface ComissionFieldProps {
	activeCurrency: Currency;
}

export const ComissionField = ({ activeCurrency }: ComissionFieldProps) => {
	const { watch, control, setValue } = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const watchComissionType = watch("comission_type");

	const { t, i18n } = useTranslation();

	useUpdateEffect(() => {
		setValue("comission", 0, {
			shouldDirty: true,
		});
	}, [watchComissionType]);

	return (
		<Form.Field
			control={control}
			name="comission"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
						{t("modal.InvestFunds.form.label.comission", {
							currency: activeCurrency,
						})}
					</Form.Label>
					<NumberInput
						locale={i18n.language}
						formatOptions={{
							style: watchComissionType === "amount" ? "currency" : "percent",
							currency: activeCurrency,
						}}
						aria-label={t("modal.InvestFunds.form.label.comission", {
							currency: activeCurrency,
						})}
						placeholder={t("modal.InvestFunds.form.input.price.placeholder")}
						{...field}
					/>
				</Form.Item>
			)}
		/>
	);
};
