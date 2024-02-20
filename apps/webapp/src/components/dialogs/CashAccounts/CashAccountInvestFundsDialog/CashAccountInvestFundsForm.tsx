import { Currency } from "__generated__/graphql";
import { Button, Dialog, Form } from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { formatCurrency } from "helpers/formatCurrency";
import { FC, Fragment, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CashAccountInvestFundsFormSchema,
	CashAccountInvestFundsFormSchemaType,
	defaultValues,
} from "./CashAccountInvestFundsFormSchema";
import { NotSupportedYet } from "./components/NotSupportedYet";
import { SearchInstrumentField } from "./components/SearchInstrumentField";
import { SelectInstrumentType } from "./components/SelectInstrumentType";

/* import { ComissionField } from "./components/ComissionField";
import { DateField } from "./components/DateField";
import { FormField } from "./components/FormField";
import { PriceField } from "./components/PriceField";
import { QuantityField } from "./components/QuantityField";
import { SearchInstrumentField } from "./components/SearchInstrumentField";
import { SelectInstrumentType } from "./components/SelectInstrumentType";
import { SelectPortfolioField } from "./components/SelectPortfolioField";
import { TransactionCostField } from "./components/TransactionCostField"; */

interface CashAccountInvestFundsFormFormProps {
	balance: number;
	currency: Currency;
	uuid: string;
}

export const CashAccountInvestFundsForm: FC<CashAccountInvestFundsFormFormProps> = ({
	balance,
	currency,
	uuid,
}) => {
	const { t } = useTranslation();

	const form = useForm<CashAccountInvestFundsFormSchemaType>({
		defaultValues,
		resolver: yupResolver(CashAccountInvestFundsFormSchema),
		mode: "onChange",
	});

	const {
		handleSubmit,
		watch,
		formState: { isValid, isSubmitting },
	} = form;

	const onSubmit = useCallback(
		(data: CashAccountInvestFundsFormSchemaType) => {
			console.log({ ...data, uuid });
		},
		[uuid],
	);

	const watchInstrument = watch("instrument");
	const watchInstrumentType = watch("instrumentType");

	const activeCurrency = watchInstrument?.Currency || currency;

	const shouldRenderMarketInstrumentFields = useMemo(() => {
		switch (watchInstrumentType) {
			case "stocks":
			case "etfs":
			case "crypto":
				return true;
			default:
				return false;
		}
	}, [watchInstrumentType]);

	const shouldRenderNotSupportedYet = !shouldRenderMarketInstrumentFields;

	return (
		<Form {...form}>
			<form
				className="flex flex-col gap-1"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Form.Item>
					<Form.Label>{t("modal.InvestFunds.form.label.account.balance")}</Form.Label>
					<Form.Description>{formatCurrency(balance, currency)}</Form.Description>
				</Form.Item>

				<SelectInstrumentType />

				{shouldRenderMarketInstrumentFields && (
					<Fragment>
						<SearchInstrumentField />

						<div>rest</div>
						{/*

						<SelectPortfolioField />

						<DateField />

						<QuantityField />

						<PriceField activeCurrency={activeCurrency as Currency} />

						<ComissionField activeCurrency={activeCurrency as Currency} />

						<TransactionCostField activeCurrency={activeCurrency as Currency} /> */}
					</Fragment>
				)}

				{shouldRenderNotSupportedYet && <NotSupportedYet />}

				<Dialog.Footer>
					<Dialog.Close asChild>
						<Button
							variant="secondary"
							className="w-1/2"
						>
							{t("common.cancel")}
						</Button>
					</Dialog.Close>

					<Button
						className="flex w-1/2 items-center justify-center gap-2"
						disabled={!isValid || isSubmitting || shouldRenderNotSupportedYet}
						type="submit"
					>
						{!isSubmitting && "Invest 🎉"}
					</Button>
				</Dialog.Footer>
			</form>
		</Form>
	);
};
