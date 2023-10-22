import { Currency, IntroductionCreateCashAccountsInput } from "__generated__/graphql";
import { Input, Spreader } from "components/atoms";
import { CurrencyCombobox } from "components/molecules";
import { useRegisterCombobox } from "hooks/useRegisterCombobox";
import { Trash2 } from "lucide-react";
import {
	Control,
	DeepRequired,
	FieldErrorsImpl,
	UseFieldArrayRemove,
	UseFormRegister,
} from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "ui";

interface CashAccountsFieldProps {
	register: UseFormRegister<IntroductionCreateCashAccountsInput>;
	control: Control<IntroductionCreateCashAccountsInput>;
	errors: FieldErrorsImpl<DeepRequired<IntroductionCreateCashAccountsInput>>;
	index: number;
	defaultValue: Currency;
	remove: UseFieldArrayRemove;
}

export const CashAccountsField = ({
	register,
	errors,
	index,
	defaultValue,
	remove,
	control,
}: CashAccountsFieldProps) => {
	const { t } = useTranslation();

	const currencySelectProps = useRegisterCombobox<IntroductionCreateCashAccountsInput>({
		control,
		name: `cashAccounts.${index}.currency`,
		defaultValue,
	});

	const handleRemoveField = async () => {
		remove(index);
	};

	return (
		<div className="flex">
			<Input
				placeholder={t("common.input.name.placeholder")}
				$flexGrow={1}
				{...register(`cashAccounts.${index}.name`)}
				error={errors.cashAccounts?.[index]?.name?.message}
			/>

			<Spreader $spread="0.25" />

			<CurrencyCombobox
				$width="130px"
				{...currencySelectProps}
			/>

			<Spreader $spread="0.25" />

			<Button
				className="shadow-none"
				color="gray"
				onClick={handleRemoveField}
			>
				<Trash2 />
			</Button>
		</div>
	);
};
