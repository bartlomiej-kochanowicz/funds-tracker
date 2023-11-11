import { Currency } from "__generated__/graphql";
import { useModal } from "@ebay/nice-modal-react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader, Spacer, Spreader } from "components/atoms";
import { formatCurrency } from "helpers/formatCurrency";
import { FC, Fragment, useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button, Text } from "ui";

import { ComissionField } from "./components/ComissionField";
import { DateField } from "./components/DateField";
import { FormField } from "./components/FormField";
import { NotSupportedYet } from "./components/NotSupportedYet";
import { PriceField } from "./components/PriceField";
import { QuantityField } from "./components/QuantityField";
import { SearchInstrumentField } from "./components/SearchInstrumentField";
import { SelectInstrumentType } from "./components/SelectInstrumentType";
import { SelectPortfolioField } from "./components/SelectPortfolioField";
import { TransactionCostField } from "./components/TransactionCostField";
import { defaultValues, InvestFundsFormValues } from "./helpers/defaultValues";
import { validationSchema } from "./InvestFundsform.schema";

interface InvestFundsFormProps {
	balance: number;
	currency: Currency;
	uuid: string;
}

export const InvestFundsForm: FC<InvestFundsFormProps> = ({ balance, currency, uuid }) => {
	const { t } = useTranslation();

	const { remove } = useModal();

	const methods = useForm<InvestFundsFormValues>({
		defaultValues,
		resolver: yupResolver<InvestFundsFormValues>(validationSchema),
		mode: "onChange",
	});

	const {
		handleSubmit,
		watch,
		formState: { isValid, isSubmitting },
	} = methods;

	const onSubmit = useCallback(
		(/* data: InvestFundsFormValues */) => {
			/* console.log({ ...data, uuid }); */
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
		<FormProvider {...methods}>
			<form
				className="flex flex-col"
				onSubmit={handleSubmit(onSubmit)}
			>
				<FormField
					label={t("modal.InvestFunds.form.label.account.balance")}
					htmlFor="balance"
				>
					<Text>{formatCurrency(balance, currency)}</Text>
				</FormField>

				<Spacer $space="0.25" />

				<SelectInstrumentType />

				{shouldRenderMarketInstrumentFields && (
					<Fragment>
						<Spacer $space="0.25" />

						<SearchInstrumentField />

						<Spacer $space="0.25" />

						<SelectPortfolioField />

						<Spacer $space="0.25" />

						<DateField />

						<Spacer $space="0.25" />

						<QuantityField />

						<Spacer $space="0.25" />

						<PriceField activeCurrency={activeCurrency as Currency} />

						<Spacer $space="0.25" />

						<ComissionField activeCurrency={activeCurrency as Currency} />

						<Spacer $space="0.25" />

						<TransactionCostField activeCurrency={activeCurrency as Currency} />
					</Fragment>
				)}

				{shouldRenderNotSupportedYet && <NotSupportedYet />}

				<Spacer />

				<div className="flex-end flex">
					<Button
						className="min-w-[120px] grow"
						color="gray"
						onPress={remove}
					>
						{t("common.cancel")}
					</Button>

					<Spreader $spread="0.5" />

					<Button
						className="min-w-[120px] grow"
						type="submit"
						isDisabled={!isValid || isSubmitting || shouldRenderNotSupportedYet}
					>
						{isSubmitting && <Loader $size="small" />}

						{!isSubmitting && "Invest 🎉"}
					</Button>
				</div>
			</form>
		</FormProvider>
	);
};
