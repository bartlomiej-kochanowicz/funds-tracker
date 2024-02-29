import { DateTimeInput, Form } from "@funds-tracker/ui";
import { getLocalTimeZone, today } from "@internationalized/date";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const DateField = () => {
	const { t, i18n } = useTranslation();

	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	return (
		<Form.Field
			control={form.control}
			name="date"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
						{t("modal.InvestFunds.form.label.purchase_date")}
					</Form.Label>
					<DateTimeInput
						aria-label={t("modal.InvestFunds.form.label.purchase_date")}
						className="w-full"
						locale={i18n.language}
						granularity="minute"
						maxValue={today(getLocalTimeZone())}
						{...field}
					/>
				</Form.Item>
			)}
		/>
	);
};
