import { Input } from "components/atoms";
import { useBreakpoint } from "hooks/useBreakpoint";
import { InvestFundsFormValues } from "components/modals/InvestFunds/helpers/defaultValues";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

export const QuantityField = () => {
	const { t } = useTranslation();

	const { register, getFieldState } = useFormContext<InvestFundsFormValues>();

	const isPhone = useBreakpoint("phone", "max");

	const { error } = getFieldState("quantity");

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.quantity")}
			htmlFor="quantity"
		>
			<Input
				id="quantity"
				$flexGrow={1}
				$width={isPhone ? "100%" : "auto"}
				placeholder={t("modal.InvestFunds.form.input.quantity.placeholder")}
				error={error?.message}
				{...register("quantity")}
			/>
		</FormField>
	);
};
