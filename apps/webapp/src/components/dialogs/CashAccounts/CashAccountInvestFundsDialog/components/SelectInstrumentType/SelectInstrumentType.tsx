import { Form, Select } from "@funds-tracker/ui";
import instruments from "constants/selectors/instruments";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const SelectInstrumentType = () => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { t } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="instrumentType"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
						{t("modal.InvestFunds.form.label.instrumentType")}
					</Form.Label>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value || undefined}
					>
						<Form.Control>
							<Select.Trigger className="w-full grow md:w-fit">
								<Select.Value
									placeholder={t(
										"modal.InvestFunds.form.select.portfolio.instrumentType.placeholder",
									)}
								/>
							</Select.Trigger>
						</Form.Control>
						<Select.Content>
							{instruments.map(({ value, label }) => (
								<Select.Item
									key={value}
									value={value}
								>
									{t(label)}
								</Select.Item>
							))}
						</Select.Content>
					</Select>
				</Form.Item>
			)}
		/>
	);
};
