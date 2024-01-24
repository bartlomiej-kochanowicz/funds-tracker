import { ErrorBoundary } from "components/ErrorBoundary";
import { ErrorContent } from "components/ErrorContent";
import { MobileNavigation } from "components/MobileNavigation";
import { Sidebar } from "components/Sidebar";
import { Topbar } from "components/Topbar";
import { Fragment, ReactNode } from "react";

interface TopbarSidebarProps {
	children: ReactNode;
}

export const TopbarSidebar = ({ children }: TopbarSidebarProps) => (
	<Fragment>
		<Topbar />

		<Sidebar />

		<MobileNavigation />

		<main className="mb-[50px] mt-[61px] p-4 md:mb-0 md:ml-[255px] md:mt-[73px]">
			<ErrorBoundary fallback={<ErrorContent />}>{children}</ErrorBoundary>
		</main>
	</Fragment>
);
