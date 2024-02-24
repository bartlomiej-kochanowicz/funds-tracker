import { Form, Label, RadioGroup } from "@funds-tracker/ui";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CashAccountInvestFundsFormSchemaType,
	defaultValues,
} from "../../CashAccountInvestFundsFormSchema";

export const ComissionTypeField = () => {
	const { control } = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { t } = useTranslation();

	return (
		<Form.Field
			control={control}
			name="comission_type"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">{t("modal.InvestFunds.form.label.price")}</Form.Label>
					<RadioGroup
						className="flex items-center py-3"
						onValueChange={field.onChange}
						defaultValue={defaultValues.comission_type}
						value={field.value}
					>
						<div className="flex items-center space-x-2">
							<RadioGroup.Item
								value="amount"
								id="r1"
							/>
							<Label htmlFor="r1">{t("common.amount")}</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroup.Item
								value="%"
								id="r2"
							/>
							<Label htmlFor="r2">%</Label>
						</div>
					</RadioGroup>
				</Form.Item>
			)}
		/>
	);
};
