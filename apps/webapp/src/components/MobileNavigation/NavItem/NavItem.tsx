import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface NavItemProps {
	to: string;
	title: string;
	icon: LucideIcon;
}

export const NavItem = ({ to, title, icon: Icon }: NavItemProps) => {
	const { t } = useTranslation();

	return (
		<li>
			<NavLink
				to={to}
				className={({ isActive }) =>
					clsx(
						"flex flex-col items-center text-center text-xs sm:text-sm",
						isActive && "text-blue-500",
					)
				}
			>
				<Icon className="mb-0.5 size-5 sm:size-6" />
				{t(title)}
			</NavLink>
		</li>
	);
};
