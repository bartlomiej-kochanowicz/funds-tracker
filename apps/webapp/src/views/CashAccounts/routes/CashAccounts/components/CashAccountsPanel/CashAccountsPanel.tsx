import { GetCashAccountsQuery } from "__generated__/graphql";
import NiceModal from "@ebay/nice-modal-react";
import { Dropdown } from "components/atoms";
import type { DropdownItems } from "components/atoms/Dropdown";
import { formatCurrency } from "helpers/formatCurrency";
import { AreaChart, List, MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import { MODAL_ADD_FUNDS_CASH_ACCOUNT } from "components/dialogs/AddFundsCashAccount";
import { MODAL_CASH_ACCOUNT_OPERATIONS } from "components/dialogs/CashAccountOperations";
import { MODAL_CONFIRM_DELETE_CASH_ACCOUNT } from "components/dialogs/ConfirmDeleteCashAccount";
import { MODAL_INVEST_FUNDS } from "components/dialogs/InvestFunds";
import { MODAL_RENAME_CASH_ACCOUNT } from "components/dialogs/RenameCashAccount";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Panel, Text } from "ui";

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

	const items = [
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
	] satisfies DropdownItems;

	return (
		<Panel className="flex justify-between">
			<div className="flex flex-col">
				<Text className="font-bold">{name}</Text>

				<Text>{formatCurrency(balance, currency)}</Text>
			</div>

			<Dropdown
				items={items}
				placement="bottom-end"
			>
				{({ isOpen, ...props }) => (
					<Button
						size="small"
						/* $outline */
						{...props}
					>
						<MoreVertical />
					</Button>
				)}
			</Dropdown>
		</Panel>
	);
};
