import { GetCashAccountsQuery } from "__generated__/graphql";
import { Button, Card, DropdownMenu } from "@funds-tracker/ui";
import clsx from "clsx";
import { formatCurrency } from "helpers/formatCurrency";
import { AreaChart, List, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";

type CashAccountCardProps = {
	isPending: boolean;
} & GetCashAccountsQuery["cashAccounts"][0];

export const CashAccountCard = ({ name, currency, balance, isPending }: CashAccountCardProps) => {
	const { t } = useTranslation();

	const items = useMemo(
		() => [
			[
				{
					icon: AreaChart,
					label: t("modal.InvestFunds.name"),
					onClick: () => {
						/* NiceModal.show(MODAL_INVEST_FUNDS, { balance, currency, uuid }); */
					},
				},
				{
					icon: List,
					label: t("page.cash_accounts.button.operations"),
					value: "operations",
					onClick: () => {
						/* NiceModal.show(MODAL_CASH_ACCOUNT_OPERATIONS, {
					deleteModalProps: { name, uuid },
					currency,
				}); */
					},
				},
				{
					icon: Plus,
					label: t("page.cash_accounts.button.add_funds"),
					onClick: () => {
						/* NiceModal.show(MODAL_ADD_FUNDS_CASH_ACCOUNT, {
					callback: updateCashAccountBalance,
					uuid,
					currency,
				}); */
					},
				},
			],
			[
				{
					icon: Pencil,
					label: t("common.rename"),
					onClick: () => {
						/* NiceModal.show(MODAL_RENAME_CASH_ACCOUNT, {
					uuid,
					name,
					callback: updateCashAccountName,
				}); */
					},
				},
				{
					icon: Trash2,
					label: t("common.delete"),
					onClick: () => {
						/* NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, {
					name,
					uuid,
					callback: updateCashAccountList,
				}); */
					},
				},
			],
		],
		[],
	);

	const groupQuantity = items.length;

	return (
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
										{group.map(({ icon: Icon, label, onClick }) => (
											<DropdownMenu.Item
												key={label}
												onClick={onClick}
											>
												<Icon className="mr-2 size-4" />

												<span>{label}</span>
											</DropdownMenu.Item>
										))}
									</DropdownMenu.Group>

									{groupQuantity !== index + 1 && <DropdownMenu.Separator />}
								</Fragment>
							))}
						</DropdownMenu.Content>
					</DropdownMenu>
				</div>
			</Card.Header>
		</Card>
	);
};
