import { Text } from "@faunds-tracker/ui";
import clsx from "clsx";
import { Spreader } from "components/atoms";
import { LucideProps } from "lucide-react";
import { FC, ForwardRefExoticComponent, Fragment } from "react";
import { useTranslation } from "react-i18next";

interface NavListItemProps {
	isActive: boolean;
	title: string;
	icon: ForwardRefExoticComponent<LucideProps>;
}

export const NavListItem: FC<NavListItemProps> = ({ isActive, title, icon: Icon }) => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Icon />

			<Spreader $spread="0.5" />

			<Text className={clsx(isActive ? "font-bold text-blue-600" : "font-medium text-gray-600")}>
				{t(title)}
			</Text>
		</Fragment>
	);
};
