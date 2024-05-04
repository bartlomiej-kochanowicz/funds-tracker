import { Currency } from "__generated__/graphql";
import { Form, NumberInput, useUpdateEffect } from "@funds-tracker/ui";
import { useLazyQueryInstrumentHistory } from "hooks/api/instruments/useLazyQueryInstrumentHistory";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

interface PriceFieldProps {
	activeCurrency: Currency;
}

export const PriceField = ({ activeCurrency }: PriceFieldProps) => {
	const form = useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { setValue, watch } = form;

	const [getInstrumentHistory] = useLazyQueryInstrumentHistory({
		onCompleted: ({ instrumentHistory }) => {
			if (!instrumentHistory.length) return;

			setValue("price", Number(instrumentHistory.at(-1)?.close.toFixed(2)), {
				shouldDirty: true,
				shouldValidate: true,
			});
		},
	});

	const watchInstrument = watch("instrument");
	const watchDate = watch("date");

	const updatePrice = useCallback(() => {
		if (watchInstrument?.Code && watchDate) {
			const sevenDaysAgo: Date = new Date(watchDate.getTime() - 7 * 24 * 60 * 60 * 1000);

			getInstrumentHistory({
				variables: {
					data: {
						code: watchInstrument.Code,
						exchange: watchInstrument.Exchange,
						from: sevenDaysAgo,
						to: watchDate,
						period: "1d",
					},
				},
			});
		}
	}, [getInstrumentHistory, watchDate, watchInstrument]);

	useUpdateEffect(() => {
		updatePrice();
	}, [updatePrice]);

	const { t, i18n } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="price"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">{t("modal.InvestFunds.form.label.price")}</Form.Label>
					<NumberInput
						locale={i18n.language}
						formatOptions={{
							style: "currency",
							currency: activeCurrency,
						}}
						aria-label={t("modal.InvestFunds.form.label.price")}
						placeholder={t("modal.InvestFunds.form.input.price.placeholder")}
						{...field}
					/>
				</Form.Item>
			)}
		/>
	);
};
