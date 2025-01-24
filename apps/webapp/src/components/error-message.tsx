import { H1, Text } from "@funds-tracker/ui";
import { Frown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
};

const ErrorMessage = ({ className }: Props) => {
	const { t } = useTranslation();

	return (
		<div className={twMerge("flex flex-col items-center justify-center text-center", className)}>
			<Frown className="mx-auto size-16 text-red-500" />
			<H1 className="mb-4">{t("component.error-message.title")}</H1>
			<Text>{t("component.error-message.description")}</Text>
		</div>
	);
};

export { ErrorMessage };
