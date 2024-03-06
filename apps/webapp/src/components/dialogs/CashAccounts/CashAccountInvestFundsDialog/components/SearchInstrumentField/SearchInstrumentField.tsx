import { Form, Text, Tooltip, useUpdateEffect } from "@funds-tracker/ui";
import { SearchInstrumentCombobox } from "components/SearchInstrumentCombobox";
import { Info } from "lucide-react";
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
					<Form.Label className="flex min-w-44">
						{t("modal.InvestFunds.form.label.instrument")}

						<Tooltip.Provider delayDuration={250}>
							<Tooltip>
								<Tooltip.Trigger asChild>
									<Info className="ml-2 size-4" />
								</Tooltip.Trigger>
								<Tooltip.Content className="max-w-60">
									<Text>
										We support more than 60 exchanges all around the world. All US exchanges are
										combined into one virtual exchange &quot;US&quot; which includes NYSE, NASDAQ,
										NYSE ARCA, and OTC/PINK tickers.
									</Text>
								</Tooltip.Content>
							</Tooltip>
						</Tooltip.Provider>
					</Form.Label>

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
