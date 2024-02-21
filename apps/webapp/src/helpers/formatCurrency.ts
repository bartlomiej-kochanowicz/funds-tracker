import { Currency } from "__generated__/graphql";
import i18n from "utils/i18n";

export const formatCurrency = (value: number, currency: Currency): string => {
	try {
		const formatter = new Intl.NumberFormat(i18n.language, {
			style: "currency",
			currency,
		});

		return formatter.format(value);
	} catch {
		return `${currency} ${value}`;
	}
};
