import { DatePicker, Form } from "@funds-tracker/ui";
import { formatDate } from "helpers/formatDate";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const DateField = () => {
	const { t } = useTranslation();

	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	return (
		<Form.Field
			control={form.control}
			name="date"
			render={({ field }) => (
				<Form.Item className="flex flex-col">
					<Form.Label>{t("modal.InvestFunds.form.label.purchase_date")}</Form.Label>
					<DatePicker
						placeholder={t("modal.InvestFunds.form.placeholder.purchase_date")}
						formatDate={date => formatDate(date, { withTime: false })}
						{...field}
					/>
					<Form.Message />
				</Form.Item>
			)}
		/>
	);
};
