import { Form, NumberInput } from "@funds-tracker/ui";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const QuantityField = () => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { t } = useTranslation();

	const { i18n } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="quantity"
			render={({ field: { value, ...rest } }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">{t("modal.InvestFunds.form.label.quantity")}</Form.Label>
					<NumberInput
						locale={i18n.language}
						placeholder={t("modal.InvestFunds.form.input.quantity.placeholder")}
						value={value || undefined}
						{...rest}
					/>
				</Form.Item>
			)}
		/>
	);
};
