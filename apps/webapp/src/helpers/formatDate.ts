import i18n from "utils/i18n";

type Options = {
	withTime?: boolean;
	withDay?: boolean;
	withMonth?: boolean;
	withYear?: boolean;
	yearFormat?: "2-digit" | "numeric";
};

export const formatDate = (date: string | Date, options?: Options): string => {
	const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

	const { withDay, withMonth, withYear, withTime, yearFormat } = {
		withDay: true,
		withMonth: true,
		withYear: true,
		withTime: true,
		yearFormat: "numeric" as const,
		...options,
	};

	return new Date(date).toLocaleDateString(i18n.language, {
		day: withDay ? "numeric" : undefined,
		month: withMonth ? "short" : undefined,
		year: withYear ? yearFormat : undefined,
		hour: withTime ? "numeric" : undefined,
		minute: withTime ? "numeric" : undefined,
		timeZone,
	});
};
