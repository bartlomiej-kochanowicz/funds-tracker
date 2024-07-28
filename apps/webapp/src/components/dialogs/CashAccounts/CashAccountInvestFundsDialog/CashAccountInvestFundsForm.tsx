import {
	Button,
	emitErrorToast,
	emitSuccessToast,
	Form,
	responsiveDialog,
	ScrollArea,
} from "@funds-tracker/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import clsx from "clsx";
import { formatCurrency } from "helpers/formatCurrency";
import { useBackgroundQueryPortfolio } from "hooks/api/portfolios/useBackgroundQueryPortfolio";
import { useMutationTransactionCreate } from "hooks/api/transactions/useMutationTransactionCreate";
import { FC, Fragment, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import {
	CashAccountInvestFundsFormSchema,
	CashAccountInvestFundsFormSchemaType,
	defaultValues,
} from "./CashAccountInvestFundsFormSchema";
import { CommissionField } from "./components/CommissionField";
import { CommissionTypeField } from "./components/CommissionTypeField";
import { DateField } from "./components/DateField";
import { NotSupportedYet } from "./components/NotSupportedYet";
import { PriceField } from "./components/PriceField";
import { QuantityField } from "./components/QuantityField";
import { SearchInstrumentField } from "./components/SearchInstrumentField";
import { SelectInstrumentType } from "./components/SelectInstrumentType";
import { SelectPortfolioField } from "./components/SelectPortfolioField";
import { TransactionCostField } from "./components/TransactionCostField";

interface CashAccountInvestFundsFormFormProps {
	balance: number;
	currency: string;
	uuid: string;
	setOpen: (open: boolean) => void;
}

export const CashAccountInvestFundsForm: FC<CashAccountInvestFundsFormFormProps> = ({
	balance,
	currency,
	uuid,
	setOpen,
}) => {
	const { t } = useTranslation();

	const navigate = useNavigate();

	const form = useForm<CashAccountInvestFundsFormSchemaType>({
		defaultValues,
		resolver: yupResolver(CashAccountInvestFundsFormSchema),
	});

	const {
		handleSubmit,
		watch,
		formState: { isValid, isSubmitting },
		getValues,
	} = form;

	const [, { refetch: refetchPortfolios }] = useBackgroundQueryPortfolio(getValues("portfolio"));

	const [transactionCreate] = useMutationTransactionCreate({
		onCompleted: async () => {
			setOpen(false);
			emitSuccessToast(t("modal.InvestFunds.toast.success"));

			await refetchPortfolios();

			navigate(generatePath(ROUTES.PORTFOLIOS.PORTFOLIO, { uuid: getValues("portfolio") }));
		},
		onError: () => {
			emitErrorToast(t("service.unknown_error"));
		},
	});

	const onSubmit = useCallback(
		async (data: CashAccountInvestFundsFormSchemaType) => {
			const date = new Date(data.date.setHours(12, 0, 0, 0));

			await transactionCreate({
				variables: {
					data: {
						portfolioUuid: data.portfolio,
						cashAccountUuid: uuid,
						instrument: {
							type: data.instrumentType,
							symbol: data.instrument.symbol,
							name: data.instrument.name,
							currency: data.instrument.currency,
						},
						date,
						quantity: data.quantity,
						price: data.price,
						commission: data.commission,
					},
				},
			});
		},
		[uuid],
	);

	const watchInstrument = watch("instrument");
	const watchInstrumentType = watch("instrumentType");

	const activeCurrency = watchInstrument?.currency || currency;

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

	const shouldRenderNotSupportedYet = Boolean(
		!shouldRenderMarketInstrumentFields && watchInstrumentType,
	);

	const ResponsiveDialog = responsiveDialog();

	return (
		<ScrollArea className={clsx(shouldRenderMarketInstrumentFields && "h-[75vh] md:h-auto")}>
			<Form {...form}>
				<form
					className="my-2 flex flex-col gap-2 px-2"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Form.Item orientation="horizontal">
						<Form.Label className="min-w-44">
							{t("modal.InvestFunds.form.label.account.balance")}
						</Form.Label>
						<Form.Description className="mt-0">
							{formatCurrency(balance, currency)}
						</Form.Description>
					</Form.Item>

					<SelectInstrumentType />

					{shouldRenderMarketInstrumentFields && (
						<Fragment>
							<SearchInstrumentField />
							<DateField />
							<PriceField activeCurrency={activeCurrency} />
							<QuantityField />
							<SelectPortfolioField />
							<CommissionTypeField />
							<CommissionField activeCurrency={activeCurrency} />
							<TransactionCostField activeCurrency={activeCurrency} />
						</Fragment>
					)}

					{shouldRenderNotSupportedYet && <NotSupportedYet />}

					<ResponsiveDialog.Footer>
						<ResponsiveDialog.Close asChild>
							<Button
								variant="secondary"
								className="md:w-1/2"
							>
								{t("common.cancel")}
							</Button>
						</ResponsiveDialog.Close>

						<Button
							className="flex items-center justify-center gap-2 md:w-1/2"
							disabled={!isValid || isSubmitting || shouldRenderNotSupportedYet}
							type="submit"
						>
							{!isSubmitting && "Invest 🎉"}
						</Button>
					</ResponsiveDialog.Footer>
				</form>
			</Form>
		</ScrollArea>
	);
};
