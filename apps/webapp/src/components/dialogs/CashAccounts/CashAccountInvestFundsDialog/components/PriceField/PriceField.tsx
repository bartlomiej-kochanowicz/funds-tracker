import {
	Currency,
	GetInstrumentHistoryQuery,
	GetInstrumentHistoryQueryVariables,
} from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";
import { Form, NumberInput } from "@funds-tracker/ui";
import { INSTRUMENT_HISTORY } from "graphql/query/instruments/InstrumentHistory";
import { useUpdateEffect } from "hooks/useUpdateEffect";
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

	const [getInstrumentHistory] = useLazyQuery<
		GetInstrumentHistoryQuery,
		GetInstrumentHistoryQueryVariables
	>(INSTRUMENT_HISTORY, {
		onCompleted: ({ instrumentHistory }) => {
			setValue("price", Number(instrumentHistory.at(-1)?.close.toFixed(2)), {
				shouldDirty: true,
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
						from: sevenDaysAgo.toISOString(),
						to: watchDate.toISOString(),
						period: "1d",
					},
				},
			});
		}
	}, [getInstrumentHistory, watchDate, watchInstrument]);

	useUpdateEffect(() => {
		updatePrice();
	}, [updatePrice]);

	const { t } = useTranslation();

	const { i18n } = useTranslation();

	return (
		<Form.Field
			control={form.control}
			name="price"
			render={({ field: { value, ...rest } }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">{t("modal.InvestFunds.form.label.price")}</Form.Label>
					<NumberInput
						locale={i18n.language}
						formatOptions={{
							style: "currency",
							currency: activeCurrency,
						}}
						placeholder={t("modal.InvestFunds.form.input.price.placeholder")}
						value={value || undefined}
						{...rest}
					/>
				</Form.Item>
			)}
		/>
	);
};
