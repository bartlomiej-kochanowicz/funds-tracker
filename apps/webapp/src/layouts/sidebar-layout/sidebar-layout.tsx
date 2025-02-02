import { SidebarProvider, SidebarTrigger } from "@funds-tracker/ui";
import { ReactNode } from "react";

import { AppSidebar } from "./app-sidebar";

type Props = {
	children: ReactNode;
};

const SidebarLayout = ({ children }: Props) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger />
					</div>
				</header>

				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</main>
		</SidebarProvider>
	);
};

export { SidebarLayout };
