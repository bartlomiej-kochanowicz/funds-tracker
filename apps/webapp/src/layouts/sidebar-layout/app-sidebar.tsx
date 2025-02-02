import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
} from "@funds-tracker/ui";

import { WalletSwitcher } from "./wallet-switcher";

const AppSidebar = () => {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<WalletSwitcher />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup />
				<SidebarGroup />
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export { AppSidebar };
