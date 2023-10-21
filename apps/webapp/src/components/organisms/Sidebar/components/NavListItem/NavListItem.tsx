import { Spreader, Text } from "components/atoms";
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

	const fontColor = isActive ? "blue" : "gray400";

	return (
		<Fragment>
			<Icon />

			<Spreader $spread="0.5" />

			<Text
				$fontColor={fontColor}
				$fontWeight={isActive ? "700" : "500"}
			>
				{t(title)}
			</Text>
		</Fragment>
	);
};
