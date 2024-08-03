import { Form, useUpdateEffect } from "@funds-tracker/ui";
import { SearchInstrumentCombobox } from "components/SearchInstrumentCombobox";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

export const SearchInstrumentField = () => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const instrumentType = form.watch("instrumentType");

	useUpdateEffect(() => {
		form.resetField("instrument");
		form.resetField("price");
	}, [instrumentType]);

	const { t } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="instrument"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="flex min-w-44">{t("common.instrument")}</Form.Label>

					<SearchInstrumentCombobox
						className="w-full md:max-w-[350px] lg:max-w-[446px]"
						instrumentType={instrumentType}
						{...field}
					/>
				</Form.Item>
			)}
		/>
	);
};
