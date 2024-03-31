import { Currency } from "__generated__/graphql";
import i18n from "utils/i18n";

type Options = {
	withFractionDigits?: boolean;
};

export const formatCurrency = (value: number, currency: Currency, options?: Options): string => {
	const { withFractionDigits } = {
		withFractionDigits: true,
		...options,
	};

	try {
		const formatter = new Intl.NumberFormat(i18n.language, {
			style: "currency",
			currency,
			minimumFractionDigits: withFractionDigits ? 2 : 0,
			maximumFractionDigits: withFractionDigits ? 2 : 0,
		});

		return formatter.format(value);
	} catch {
		return `${currency} ${value}`;
	}
};
