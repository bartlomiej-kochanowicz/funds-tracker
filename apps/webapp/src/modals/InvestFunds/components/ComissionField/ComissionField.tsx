import { Currency } from "__generated__/graphql";
import { Input, Radio, RadioGroup, Spacer, Spreader } from "components/atoms";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useCurrencyInput } from "hooks/useCurrencyInput";
import { useRadio } from "hooks/useRadio";
import { defaultValues, InvestFundsFormValues } from "modals/InvestFunds/helpers/defaultValues";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { FormField } from "../FormField";

interface ComissionFieldProps {
	activeCurrency: Currency;
}

export const ComissionField: FC<ComissionFieldProps> = ({ activeCurrency }) => {
	const { t } = useTranslation();

	const { register, watch, control, setValue, getFieldState } =
		useFormContext<InvestFundsFormValues>();

	const radoProps = useRadio<InvestFundsFormValues>({
		control,
		name: "comission_type",
		setValue,
		onChange: () => {
			setValue("comission", "");
		},
	});

	const watchComissionType = watch("comission_type");

	const isPhone = useBreakpoint("phone", "max");

	const { error } = getFieldState("comission");

	const currencyInputProps = useCurrencyInput<InvestFundsFormValues>({
		control,
		name: "comission",
	});

	return (
		<FormField
			label={t("modal.InvestFunds.form.label.comission", {
				currency: activeCurrency,
			})}
			htmlFor="comission"
		>
			<div className="flex w-full grow flex-col-reverse md:w-auto md:flex-row md:items-center">
				{watchComissionType === "%" && (
					<Input
						id="comission"
						$flexGrow={1}
						placeholder={t("modal.InvestFunds.form.input.comission.placeholder")}
						unit="%"
						$width={isPhone ? "100%" : "auto"}
						error={error?.message}
						{...register("comission")}
					/>
				)}

				{watchComissionType === "amount" && (
					<Input
						type="currency"
						$flexGrow={1}
						placeholder={t("modal.InvestFunds.form.input.comission.placeholder")}
						currency={activeCurrency as Currency}
						$width={isPhone ? "100%" : "auto"}
						error={error?.message}
						{...currencyInputProps}
					/>
				)}

				{isPhone ? <Spacer $space="0.1" /> : <Spreader $spread="0.25" />}

				<RadioGroup
					defaultValue={defaultValues.comission_type}
					{...radoProps}
				>
					<Radio value="%">%</Radio>

					<Radio value="amount">{t("common.amount")}</Radio>
				</RadioGroup>
			</div>
		</FormField>
	);
};
