import { GetCashAccountsQuery } from "__generated__/graphql";
import { Button, Card, DropdownMenu } from "@funds-tracker/ui";
import clsx from "clsx";
import { useConfirmDeleteCashAccountDialog } from "components/dialogs/ConfirmDeleteCashAccountDialog";
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

	const { open: openConfirmDeleteCashAccountDialog, dialog: ConfirmDeleteCashAccountDialog } =
		useConfirmDeleteCashAccountDialog();

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
				},
				{
					icon: Plus,
					label: t("page.cash_accounts.button.add_funds"),
				},
			],
			[
				{
					icon: Pencil,
					label: t("common.rename"),
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
			<ConfirmDeleteCashAccountDialog
				uuid={uuid}
				name={name}
				handleRefetch={handleRefetch}
			/>
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
											{group.map(({ icon: Icon, label, onSelect }) => {
												return (
													<DropdownMenu.Item
														key={label}
														onSelect={onSelect}
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
