import { GetCashAccountsQuery } from "__generated__/graphql";
import { Button, Card, DropdownMenu } from "@funds-tracker/ui";
import clsx from "clsx";
import { useCashAccountAddFundsDialog } from "components/dialogs/CashAccounts/CashAccountAddFundsDialog";
import { useCashAccountConfirmDeleteDialog } from "components/dialogs/CashAccounts/CashAccountConfirmDeleteDialog";
import { useCashAccountInvestFundsDialog } from "components/dialogs/CashAccounts/CashAccountInvestFundsDialog";
import { useCashAccountOperationsDialog } from "components/dialogs/CashAccounts/CashAccountOperationsDialog";
import { useCashAccountRenameDialog } from "components/dialogs/CashAccounts/CashAccountRenameDialog";
import { formatCurrency } from "helpers/formatCurrency";
import { AreaChart, List, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

type CashAccountCardProps = {
	isPending: boolean;
	handleRefetch: () => void;
} & GetCashAccountsQuery["cashAccounts"][0];

export const CashAccountCard = ({
	name,
	currency,
	balance,
	isPending,
	uuid,
	handleRefetch,
}: CashAccountCardProps) => {
	const { t } = useTranslation();

	const { open: openCashAccoutnInvestFundsDialog, dialog: CashAccoutnInvestFundsDialog } =
		useCashAccountInvestFundsDialog({ handleRefetch, uuid, balance, currency });

	const { open: openCashAccountOperationsDialog, dialog: CashAccountOperationsDialog } =
		useCashAccountOperationsDialog({ uuid, currency });

	const { open: openCashAccountConfirmDeleteDialog, dialog: CashAccountConfirmDeleteDialog } =
		useCashAccountConfirmDeleteDialog({ uuid, name, handleRefetch });

	const { open: openCashAccountRenameDialog, dialog: CashAccountRenameDialog } =
		useCashAccountRenameDialog({ uuid, name, handleRefetch });

	const { open: openCashAccountAddFundsDialog, dialog: CashAccountAddFundsDialog } =
		useCashAccountAddFundsDialog({
			handleRefetch,
			uuid,
			currency,
		});

	const items = useMemo(
		() => [
			[
				{
					icon: AreaChart,
					label: t("modal.CashAccountInvestFunds.name"),
					onSelect: openCashAccoutnInvestFundsDialog,
				},
				{
					icon: List,
					label: t("page.cash_accounts.button.operations"),
					onSelect: openCashAccountOperationsDialog,
				},
				{
					icon: Plus,
					label: t("page.cash_accounts.button.add_funds"),
					onSelect: openCashAccountAddFundsDialog,
				},
			],
			[
				{
					icon: Pencil,
					label: t("common.rename"),
					onSelect: openCashAccountRenameDialog,
				},
				{
					icon: Trash2,
					label: t("common.delete"),
					onSelect: openCashAccountConfirmDeleteDialog,
				},
			],
		],
		[],
	);

	const groupQuantity = items.length;

	return (
		<Fragment>
			{CashAccoutnInvestFundsDialog}
			{CashAccountOperationsDialog}
			{CashAccountConfirmDeleteDialog}
			{CashAccountRenameDialog}
			{CashAccountAddFundsDialog}

			<Card
				className={clsx(
					"flex justify-between",
					isPending && "pointer-events-auto cursor-not-allowed opacity-50",
				)}
			>
				<Card.Header className="w-full">
					<div className="flex items-center justify-between">
						<div className="max-w-[80%] grow">
							<Card.Title>{name}</Card.Title>
							<Card.Description>{formatCurrency(balance, currency)}</Card.Description>
						</div>
						<DropdownMenu>
							<DropdownMenu.Trigger asChild>
								<Button
									aria-label={t("common.more")}
									variant="outline"
									size="icon"
								>
									<MoreVertical />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								{items.map((group, index) => (
									<Fragment key={index}>
										<DropdownMenu.Group>
											{group.map(({ icon: Icon, label, ...rest }) => {
												return (
													<DropdownMenu.Item
														key={label}
														onSelect={rest.onSelect}
													>
														<Icon className="mr-2 size-4" />

														<span>{label}</span>
													</DropdownMenu.Item>
												);
											})}
										</DropdownMenu.Group>

										{groupQuantity !== index + 1 && <DropdownMenu.Separator />}
									</Fragment>
								))}
							</DropdownMenu.Content>
						</DropdownMenu>
					</div>
				</Card.Header>
			</Card>
		</Fragment>
	);
};
