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
	Skeleton,
	useSidebar,
} from "@funds-tracker/ui";
import { useQueryWallets } from "graphql/wallet/useQueryWallets";
import { ChevronsUpDown, Plus, Wallet } from "lucide-react";

const WalletSwitcher = () => {
	const { isMobile } = useSidebar();

	const { data, loading } = useQueryWallets();

	if (loading || !data)
		return (
			<div className="flex items-center space-x-2 p-2">
				<Skeleton className="size-8 rounded-full" />
				<div className="grow space-y-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-3 w-1/2" />
				</div>
			</div>
		);

	const { wallets } = data;

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
