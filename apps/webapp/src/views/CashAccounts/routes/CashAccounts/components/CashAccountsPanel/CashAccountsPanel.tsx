import { GetCashAccountsQuery } from "__generated__/graphql";
import { Button, Card, Text } from "@funds-tracker/ui";
import { formatCurrency } from "helpers/formatCurrency";
import { AreaChart, List, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface CashAccountsPanelProps {
	updateCashAccountBalance: (data: { balance: number; uuid: string }) => void;
	updateCashAccountName: (data: { name: string; uuid: string }) => void;
	updateCashAccountList: (data: { uuid: string }) => void;
}

export const CashAccountsPanel: FC<
	GetCashAccountsQuery["cashAccounts"][0] & CashAccountsPanelProps
> = ({
	name,
	currency,
	balance,
	uuid,
	updateCashAccountBalance,
	updateCashAccountName,
	updateCashAccountList,
}) => {
	const { t } = useTranslation();

	/* const items = [
		{
			icon: AreaChart,
			label: t("modal.InvestFunds.name"),
			value: "invest",
			onClick: () => {
				NiceModal.show(MODAL_INVEST_FUNDS, { balance, currency, uuid });
			},
		},
		{
			icon: List,
			label: t("page.cash_accounts.button.operations"),
			value: "operations",
			onClick: () => {
				NiceModal.show(MODAL_CASH_ACCOUNT_OPERATIONS, {
					deleteModalProps: { name, uuid },
					currency,
				});
			},
		},
		{
			icon: Plus,
			label: t("page.cash_accounts.button.add_funds"),
			value: "add_funds",
			divider: "bottom",
			onClick: () => {
				NiceModal.show(MODAL_ADD_FUNDS_CASH_ACCOUNT, {
					callback: updateCashAccountBalance,
					uuid,
					currency,
				});
			},
		},
		{
			icon: Pencil,
			label: t("common.rename"),
			value: "rename",
			onClick: () => {
				NiceModal.show(MODAL_RENAME_CASH_ACCOUNT, {
					uuid,
					name,
					callback: updateCashAccountName,
				});
			},
		},
		{
			icon: Trash2,
			label: t("common.delete"),
			value: "delete",
			onClick: () => {
				NiceModal.show(MODAL_CONFIRM_DELETE_CASH_ACCOUNT, {
					name,
					uuid,
					callback: updateCashAccountList,
				});
			},
		},
	] satisfies DropdownItems; */

	return (
		<Card className="flex justify-between">
			<Card.Header className="w-full">
				<div className="flex items-center justify-between">
					<div>
						<Card.Title>{name}</Card.Title>
						<Card.Description>{formatCurrency(balance, currency)}</Card.Description>
					</div>
					<Button
						variant="outline"
						size="icon"
					>
						<MoreVertical />
					</Button>
				</div>
			</Card.Header>
		</Card>
	);
};
