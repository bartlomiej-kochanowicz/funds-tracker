import { ComboBox } from "@funds-tracker/ui";
import { currencyFlags } from "constants/currencyFlags";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { useTranslation } from "react-i18next";

export const CurrencyCombobox = () => {
	const { t } = useTranslation();

	return (
		<ComboBox
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
