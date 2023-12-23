import { useBreakpoint } from "@faunds-tracker/ui";
import { ErrorContent } from "components/ErrorContent";
import { MobileNavigation } from "components/MobileNavigation";
import { MobileTopbar } from "components/MobileTopbar";
import { Topbar } from "components/Topbar";
import { Sidebar } from "lucide-react";
import { Fragment, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation } from "react-router-dom";
import { ROUTES } from "routes/paths";

interface TopbarSidebarProps {
	children: ReactNode;
}

export const TopbarSidebar = ({ children }: TopbarSidebarProps) => {
	const isDesktop = useBreakpoint("md");

	const location = useLocation();

	const isHub = location.pathname === ROUTES.HUB;

	return (
		<Fragment>
			{isDesktop && (
				<Fragment>
					<Topbar />

					<Sidebar />
				</Fragment>
			)}

			{!isDesktop && (
				<Fragment>
					<MobileTopbar isDashboard={!isHub} />

					<MobileNavigation />
				</Fragment>
			)}

			<main className="min-h-screen p-4">
				<ErrorBoundary FallbackComponent={ErrorContent}>{children}</ErrorBoundary>
			</main>
		</Fragment>
	);
};
