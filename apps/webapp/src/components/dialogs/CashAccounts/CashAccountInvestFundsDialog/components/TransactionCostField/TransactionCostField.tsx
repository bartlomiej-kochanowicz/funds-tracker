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

		setValue("transaction_cost", Number(transactionCost.toFixed(2)), {
			shouldDirty: true,
		});
	};

	return (
		<Form.Field
			control={control}
			name="transaction_cost"
			render={({ field }) => (
				<Form.Item orientation="horizontal">
					<Form.Label className="min-w-44">
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
