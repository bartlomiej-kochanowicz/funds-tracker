import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@funds-tracker/ui";
import languages from "constants/selectors/language";
import { Globe2 } from "lucide-react";
import { useTranslation } from "react-i18next";

const LangSelect = () => {
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
			<SelectTrigger className="w-[130px]">
				<Globe2 />

				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{languages.map(({ label, value }) => (
						<SelectItem
							value={value}
							key={value}
						>
							{t(label)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export { LangSelect };
