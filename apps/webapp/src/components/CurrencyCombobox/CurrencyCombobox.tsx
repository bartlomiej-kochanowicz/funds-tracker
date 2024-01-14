import { Currency } from "__generated__/graphql";
import { ComboBox } from "@funds-tracker/ui";
import { currencyFlags } from "constants/currencyFlags";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { Control, FieldValues, Path, PathValue, useController } from "react-hook-form";
import { useTranslation } from "react-i18next";

type CurrencyComboboxProps<FormType extends FieldValues> = {
	control: Control<FormType>;
	name: Path<FormType>;
	defaultValue?: PathValue<FormType, Path<FormType>>;
};

export const CurrencyCombobox = <FormType extends { currency: Currency }>({
	control,
	name,
	defaultValue,
}: CurrencyComboboxProps<FormType>) => {
	const { t } = useTranslation();

	const {
		field: { value, onChange },
	} = useController<FormType>({
		control,
		name,
		defaultValue,
	});

	return (
		<ComboBox
			defaultSelectedKey={defaultValue}
			selectedKey={value}
			onSelectionChange={e => onChange(e)}
			aria-label={t("form.currency.select.placeholder")}
			placeholder={t("form.currency.select.placeholder")}
		>
			{CURRENCIES_ARRAY.map(currency => (
				<ComboBox.Item
					key={currency}
					textValue={currency}
				>
					<div className="flex items-center gap-2">
						<img
							className="h-4 w-auto"
							src={currencyFlags[currency]}
							alt={currency}
						/>

						{t(`currency.${currency}`)}
					</div>
				</ComboBox.Item>
			))}
		</ComboBox>
	);
};
