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
			<Link
				to={to}
				className="flex items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 ring-blue-300 transition-all hover:bg-gray-100 focus:outline-none focus:ring-4 dark:text-white dark:ring-blue-800 hover:dark:bg-neutral-700"
			>
				<Icon className="h-4 w-4" />
				{t(title)}
			</Link>
		</li>
	);
};
