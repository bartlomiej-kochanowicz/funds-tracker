import i18n from "utils/i18n";

export const formatDate = (date: string): string => {
	const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

	return new Date(date).toLocaleDateString(i18n.language, {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "numeric",
		timeZone,
	});
};
