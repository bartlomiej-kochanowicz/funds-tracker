import { Form, NumberInput, useUpdateEffect } from "@funds-tracker/ui";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

interface CommissionFieldProps {
	activeCurrency: string;
}

export const CommissionField = ({ activeCurrency }: CommissionFieldProps) => {
	const { watch, control, resetField } = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const watchCommissionType = watch("commission_type");

	const { t, i18n } = useTranslation();

	useUpdateEffect(() => {
		resetField("commission");
	}, [watchCommissionType]);

	return (
		<Form.Field
			control={control}
			name="commission"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
						{t("modal.InvestFunds.form.label.commission", {
							currency: activeCurrency,
						})}
					</Form.Label>
					<NumberInput
						locale={i18n.language}
						formatOptions={
							watchCommissionType === "amount"
								? {
										style: "currency",
										currency: activeCurrency,
									}
								: { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 2 }
						}
						aria-label={t("modal.InvestFunds.form.label.commission", {
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
