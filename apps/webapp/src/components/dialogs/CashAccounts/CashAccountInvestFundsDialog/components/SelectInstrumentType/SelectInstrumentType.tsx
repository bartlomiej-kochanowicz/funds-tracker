import { Form, Select } from "@funds-tracker/ui";
import instruments from "constants/selectors/instruments";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const SelectInstrumentType = () => {
	const form = useFormContext();

	const { t } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="email"
			render={({ field }) => (
				<Form.Item>
					<Form.Label>{t("modal.InvestFunds.form.label.instrumentType")}</Form.Label>
					<Select
						onValueChange={field.onChange}
						defaultValue={field.value}
					>
						<Form.Control>
							<Select.Trigger>
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
					<Form.Message />
				</Form.Item>
			)}
		/>
	);
};
