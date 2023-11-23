import { Select, Spreader } from "components/atoms";
import languages from "constants/selectors/languages";
import { Globe2 } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const LangSelector = () => {
	const { t, i18n } = useTranslation();

	const items = useMemo(
		() =>
			languages.map(({ label, ...rest }) => ({
				label: t(label),
				...rest,
			})),
		[t],
	);

	const handleChangeLanguage = (value: string) => {
		i18n.changeLanguage(value);
	};

	const customLabel = ({ value }: { value: string }) => (
		<div className="flex items-center">
			<Globe2 />

			<Spreader $spread="0.5" />

			{t(`selectors.languages.${value}`)}
		</div>
	);

	return (
		<Select
			items={items}
			defaultValue={i18n.resolvedLanguage}
			onChange={handleChangeLanguage}
			customLabel={customLabel}
			width="fit-content"
		/>
	);
};
