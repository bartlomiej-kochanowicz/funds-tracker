import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@funds-tracker/ui";
import { ChevronsUpDown, Plus, Wallet } from "lucide-react";

const WalletSwitcher = () => {
	const { isMobile } = useSidebar();

	// TODO: Fetch wallets from the API
	const wallets = [
		{
			name: "Main wallet",
			uuid: "64bce0c9-2cc9-438a-97f8-a11a8ca44a48",
		},
		{
			name: "Savings",
			uuid: "64bce0c9-2cc9-438a-97f8-a11a8ca44a49",
		},
		{
			name: "Investments",
			uuid: "64bce0c9-2cc9-438a-97f8-a11a8ca44a50",
		},
	];

	const activeWallet = wallets[0];

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
								<Wallet className="size-4" />
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">{activeWallet.name}</span>
								<span className="truncate text-xs">Wallet</span>
							</div>
							<ChevronsUpDown className="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-xs text-muted-foreground">Wallets</DropdownMenuLabel>
						{wallets.map(wallet => (
							<DropdownMenuItem
								key={wallet.uuid}
								className="p-2"
							>
								{wallet.name}
							</DropdownMenuItem>
						))}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add wallet</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};

export { WalletSwitcher };
