import {
	cn,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	useSidebar,
} from "@funds-tracker/ui";
import { Logo } from "components/logo";
import { ThemeToggle } from "components/theme-toggle";
import { useUserContext } from "contexts/UserContext";

import { NavUser } from "./nav-user";
import { WalletSwitcher } from "./wallet-switcher";

const AppSidebar = () => {
	const { open } = useSidebar();
	const { user } = useUserContext();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Logo
					className={cn("ml-0 mr-auto h-8 w-auto", open && "p-2 h-12")}
					variant={open ? "text" : "icon"}
				/>
				<WalletSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter>
				{open && <ThemeToggle />}
				<NavUser user={user} />
			</SidebarFooter>
		</Sidebar>
	);
};

export { AppSidebar };
