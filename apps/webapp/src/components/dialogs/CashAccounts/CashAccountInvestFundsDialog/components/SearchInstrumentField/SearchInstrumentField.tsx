import { Form } from "@funds-tracker/ui";
import { SearchInstrumentCombobox } from "components/SearchInstrumentCombobox";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const SearchInstrumentField = () => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const instrumentType = form.watch("instrumentType");

	const { t } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="instrument"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="w-40 min-w-40">
						{t("modal.InvestFunds.form.label.instrument")}
					</Form.Label>
					<SearchInstrumentCombobox
						className="w-full"
						instrumentType={instrumentType}
						{...field}
					/>
				</Form.Item>
			)}
		/>
	);
};
