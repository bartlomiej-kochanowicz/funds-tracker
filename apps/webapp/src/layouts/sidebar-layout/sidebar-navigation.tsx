import {
	cn,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@funds-tracker/ui";
import {
	CalendarDays,
	ChartNoAxesCombined,
	ChartPie,
	Coins,
	History,
	Star,
	Users,
	Wallet,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

type NavigationItem = {
	title: string;
	url: string;
	icon: any;
};

type NavItemProps = {
	item: NavigationItem;
};

const NavItem = ({ item }: NavItemProps) => (
	<SidebarMenuItem key={item.title}>
		<SidebarMenuButton asChild>
			<NavLink to={item.url}>
				{({ isActive }) => (
					<>
						<item.icon className={cn(isActive && "text-sidebar-accent-foreground")} />
						<span className={cn(isActive && "text-sidebar-accent-foreground")}>{item.title}</span>
					</>
				)}
			</NavLink>
		</SidebarMenuButton>
	</SidebarMenuItem>
);

const SidebarNavigation = () => {
	const { t } = useTranslation();

	const investments = [
		{
			title: t("navigation.investments.dashboard"),
			url: "/dashboard",
			icon: ChartNoAxesCombined,
		},
		{
			title: t("navigation.investments.analysis"),
			url: "/analysis",
			icon: ChartPie,
		},
		{
			title: t("navigation.investments.activities"),
			url: "/activities",
			icon: History,
		},
		{
			title: t("navigation.investments.dividends"),
			url: "/dividends",
			icon: Coins,
		},
	] satisfies NavigationItem[];

	const tools = [
		{
			title: t("navigation.tools.wallets"),
			url: "/wallets",
			icon: Wallet,
		},
		{
			title: t("navigation.tools.watchlist"),
			url: "/watchlist",
			icon: Star,
		},
		{
			title: t("navigation.tools.dividend-calendar"),
			url: "/dividend-calendar",
			icon: CalendarDays,
		},
		{
			title: t("navigation.tools.community"),
			url: "/community",
			icon: Users,
		},
	] satisfies NavigationItem[];

	return (
		<SidebarContent>
			<SidebarGroup>
				<SidebarGroupLabel>{t("navigation.investments.label")}</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{investments.map(item => (
							<NavItem
								item={item}
								key={item.title}
							/>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>

			<SidebarGroup>
				<SidebarGroupLabel>{t("navigation.tools.label")}</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						{tools.map(item => (
							<NavItem
								item={item}
								key={item.title}
							/>
						))}
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
	);
};

export { SidebarNavigation };
