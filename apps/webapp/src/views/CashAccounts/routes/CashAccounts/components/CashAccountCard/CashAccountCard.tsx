import { GetCashAccountsQuery } from "__generated__/graphql";
import { Button, Card, DropdownMenu } from "@funds-tracker/ui";
import clsx from "clsx";
import { useAddFundsToCashAccountDialog } from "components/dialogs/CashAccounts/AddFundsToCashAccountDialog";
import { useCashAccountOperationsDialog } from "components/dialogs/CashAccounts/CashAccountOperations";
import { useConfirmDeleteCashAccountDialog } from "components/dialogs/CashAccounts/ConfirmDeleteCashAccountDialog";
import { useRenameCashAccountDialog } from "components/dialogs/CashAccounts/RenameCashAccountDialog";
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

	const { open: openCashAccountOperationsDialog, dialog: CashAccountOperationsDialog } =
		useCashAccountOperationsDialog({ uuid, currency });

	const { open: openConfirmDeleteCashAccountDialog, dialog: ConfirmDeleteCashAccountDialog } =
		useConfirmDeleteCashAccountDialog({ uuid, name, handleRefetch });

	const { open: openRenameCashAccountDialog, dialog: RenameCashAccountDialog } =
		useRenameCashAccountDialog({ uuid, name, handleRefetch });

	const { open: openAddFundsToCashAccountDialog, dialog: AddFundsToCashAccountDialog } =
		useAddFundsToCashAccountDialog({
			handleRefetch,
			uuid,
			currency,
		});

	const items = useMemo(
		() => [
			[
				{
					icon: AreaChart,
					label: t("modal.InvestFunds.name"),
				},
				{
					icon: List,
					label: t("page.cash_accounts.button.operations"),
					onSelect: openCashAccountOperationsDialog,
				},
				{
					icon: Plus,
					label: t("page.cash_accounts.button.add_funds"),
					onSelect: openAddFundsToCashAccountDialog,
				},
			],
			[
				{
					icon: Pencil,
					label: t("common.rename"),
					onSelect: openRenameCashAccountDialog,
				},
				{
					icon: Trash2,
					label: t("common.delete"),
					onSelect: openConfirmDeleteCashAccountDialog,
				},
			],
		],
		[],
	);

	const groupQuantity = items.length;

	return (
		<Fragment>
			{CashAccountOperationsDialog}
			{ConfirmDeleteCashAccountDialog}
			{RenameCashAccountDialog}
			{AddFundsToCashAccountDialog}

			<Card
				className={clsx(
					"flex justify-between",
					isPending && "pointer-events-auto cursor-not-allowed opacity-50",
				)}
			>
				<Card.Header className="w-full">
					<div className="flex items-center justify-between">
						<div>
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
