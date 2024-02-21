import i18n from "utils/i18n";

type Options = {
	withTime?: boolean;
};

export const formatDate = (date: string | Date, options: Options = { withTime: true }): string => {
	const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

	return new Date(date).toLocaleDateString(i18n.language, {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: options?.withTime ? "numeric" : undefined,
		minute: options?.withTime ? "numeric" : undefined,
		timeZone,
	});
};
