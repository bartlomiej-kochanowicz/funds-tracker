import { Currency } from "__generated__/graphql";
import { Box, Button, Icon, Input, Spreader } from "components/atoms";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useCurrencyInput } from "hooks/useCurrencyInput";
import { InvestFundsFormValues } from "modals/InvestFunds/helpers/defaultValues";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaCalculator } from "react-icons/fa";

import { FormField } from "../FormField";

interface ITransactionCostFieldProps {
	activeCurrency: Currency;
}

export const TransactionCostField: FC<ITransactionCostFieldProps> = ({ activeCurrency }) => {
	const { t } = useTranslation();

	const { control, getFieldState, getValues, setValue, watch } =
		useFormContext<InvestFundsFormValues>();

	const isPhone = useBreakpoint("phone", "max");

	const { error: transactionCostError } = getFieldState("transaction_cost");
	const { error: comissionError } = getFieldState("comission");

	const calculateTransactionCost = () => {
		const { price, quantity, comission, comission_type: comissionType } = getValues();

		if (!price || !quantity || !comission || !comissionType) return;

		let transactionCost = 0;

		if (comissionType === "amount") {
			transactionCost = Number(price) * Number(quantity) + Number(comission);
		}

		if (comissionType === "%") {
			transactionCost =
				Number(price) * Number(quantity) +
				(Number(price) * Number(quantity) * Number(comission)) / 100;
		}

		setValue("transaction_cost", String(transactionCost.toFixed(2)), {
			shouldDirty: true,
			shouldTouch: true,
			shouldValidate: true,
		});
	};

	const watchQuantity = watch("quantity");
	const watchPrice = watch("price");
	const watchComission = watch("comission");

	const currencyInputProps = useCurrencyInput<InvestFundsFormValues>({
		control,
		name: "transaction_cost",
	});

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.transaction_cost")}
			htmlFor="transaction_cost"
		>
			<Box $flex $flexGrow={1} $width={isPhone ? "100%" : undefined}>
				<Input
					type="currency"
					$flexGrow={1}
					$width={isPhone ? "100%" : "auto"}
					placeholder={t("modal.InvestFunds.form.input.transaction_cost.placeholder")}
					currency={activeCurrency}
					error={transactionCostError?.message}
					{...currencyInputProps}
				/>

				<Spreader $spread="0.25" />

				<Button
					$color="secondary"
					onClick={calculateTransactionCost}
					disabled={!watchQuantity || !watchPrice || !watchComission || Boolean(comissionError)}
				>
					<Icon icon={FaCalculator} />
				</Button>
			</Box>
		</FormField>
	);
};