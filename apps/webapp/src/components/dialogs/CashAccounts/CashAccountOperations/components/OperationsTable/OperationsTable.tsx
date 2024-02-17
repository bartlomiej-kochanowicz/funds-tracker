import {
	Currency,
	GetCashAccountOperationsQuery,
	GetCashAccountOperationsQueryVariables,
} from "__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Loader, Table, Text } from "@funds-tracker/ui";
import { GET_CASH_ACCOUNT_OPERATIONS } from "graphql/query/cashAccounts/GetCashAccountOperations";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { ArrowDownCircle } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface OperationsTableProps {
	uuid: string;
	currency: Currency;
}

export const OperationsTable: FC<OperationsTableProps> = ({ uuid, currency }) => {
	const { t } = useTranslation();

	const { loading, data } = useQuery<
		GetCashAccountOperationsQuery,
		GetCashAccountOperationsQueryVariables
	>(GET_CASH_ACCOUNT_OPERATIONS, { variables: { uuid } });

	const cashAccountsOperationsExist = Boolean(data && data.cashAccount.operations.length > 0);

	if (loading) {
		return <Loader />;
	}

	if (!loading && !cashAccountsOperationsExist) {
		return <Text className="font-bold">{t("modal.RenameCashAccount.operations.empty")}</Text>;
	}

	if (!loading && cashAccountsOperationsExist) {
		return (
			<Table>
				<Table.Caption>{t("modal.CashAccountOperations.table.caption")}</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>{t("common.amount")}</Table.Head>
						<Table.Head>{t("common.date")}</Table.Head>
						<Table.Head>{t("common.type")}</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{data?.cashAccount.operations.map(({ type, uuid, amount, date }) => (
						<Table.Row key={uuid}>
							<Table.Cell>{formatCurrency(amount, currency)}</Table.Cell>
							<Table.Cell>{formatDate(date)}</Table.Cell>
							<Table.Cell className="flex items-center gap-1">
								{type === "withdrawal" && <ArrowDownCircle className="size-4" />}
								{type === "deposit" && <ArrowDownCircle className="size-4 rotate-180" />}
								{t(`cashAccount.operation.type.${type}`)}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table>
		);
	}

	return null;
};
