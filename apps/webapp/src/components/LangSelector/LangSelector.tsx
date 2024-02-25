import { Select } from "@funds-tracker/ui";
import languages from "constants/selectors/languages";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LangSelector = () => {
	const { t, i18n } = useTranslation();

	const handleChangeLanguage = (value: string) => {
		i18n.changeLanguage(value);
	};

	const defaultValue =
		languages.find(({ value }) => value === i18n.language)?.value || languages[1].value;

	return (
		<Select
			onValueChange={handleChangeLanguage}
			defaultValue={defaultValue}
		>
			<Select.Trigger className="w-[180px]">
				<Globe2 className="mr-2" />

				<Select.Value />
			</Select.Trigger>
			<Select.Content>
				<Select.Group>
					{languages.map(({ label, value }) => (
						<Select.Item
							value={value}
							key={value}
						>
							{t(label)}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select>
	);
};
