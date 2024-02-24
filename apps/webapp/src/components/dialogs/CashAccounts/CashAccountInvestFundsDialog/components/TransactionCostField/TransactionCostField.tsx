/* import { Currency } from "__generated__/graphql";
import { Button } from "@funds-tracker/ui";
import { Input, Spreader } from "components/atoms";
import { InvestFundsFormValues } from "components/modals/InvestFunds/helpers/defaultValues";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useCurrencyInput } from "hooks/useCurrencyInput";
import { Calculator } from "lucide-react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

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
			<div className="flex w-full grow md:w-auto">
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
					color="black"
					onPress={calculateTransactionCost}
					isDisabled={!watchQuantity || !watchPrice || !watchComission || Boolean(comissionError)}
				>
					<Calculator />
				</Button>
			</div>
		</FormField>
	);
};
 */

import { Currency } from "__generated__/graphql";
import { Button, Form, NumberInput } from "@funds-tracker/ui";
import { Calculator } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CashAccountInvestFundsFormSchemaType } from "../../CashAccountInvestFundsFormSchema";

interface TransactionCostFieldProps {
	activeCurrency: Currency;
}

export const TransactionCostField = ({ activeCurrency }: TransactionCostFieldProps) => {
	const { watch, control, setValue, getValues } =
		useFormContext<CashAccountInvestFundsFormSchemaType>();

	const { t, i18n } = useTranslation();

	const watchQuantity = watch("quantity");
	const watchPrice = watch("price");
	const watchComission = watch("comission");

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

	return (
		<Form.Field
			control={control}
			name="comission"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label
						className="min-w-44"
						htmlFor="comission"
					>
						{t("modal.InvestFunds.form.label.transaction_cost")}
					</Form.Label>
					<NumberInput
						locale={i18n.language}
						formatOptions={{
							style: "currency",
							currency: activeCurrency,
						}}
						aria-label={t("modal.InvestFunds.form.label.comission", {
							currency: activeCurrency,
						})}
						placeholder={t("modal.InvestFunds.form.input.transaction_cost.placeholder")}
						{...field}
					/>
					<Button
						className="md:ml-2"
						variant="secondary"
						onClick={calculateTransactionCost}
						disabled={!watchQuantity || !watchPrice || !watchComission}
					>
						<Calculator />
					</Button>
				</Form.Item>
			)}
		/>
	);
};
