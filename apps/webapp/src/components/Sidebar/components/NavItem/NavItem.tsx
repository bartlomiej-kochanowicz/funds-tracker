import { Button } from "@funds-tracker/ui";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface NavItemProps {
	to: string;
	title: string;
	icon: LucideIcon;
}

export const NavItem = ({ to, title, icon: Icon }: NavItemProps) => {
	const { t } = useTranslation();

	return (
		<li>
			<Button
				asChild
				variant="ghost"
				className="w-full !justify-start"
			>
				<Link to={to}>
					<Icon className="mr-2 size-4" />

					{t(title)}
				</Link>
			</Button>
		</li>
	);
};
