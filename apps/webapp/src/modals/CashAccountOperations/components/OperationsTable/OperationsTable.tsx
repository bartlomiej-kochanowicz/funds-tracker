import {
	Currency,
	GetCashAccountOperationsQuery,
	GetCashAccountOperationsQueryVariables,
} from "__generated__/graphql";
import { useQuery } from "@apollo/client";
import { Loader, Text } from "components/atoms";
import { Table } from "components/molecules";
import { GET_CASH_ACCOUNT_OPERATIONS } from "graphql/query/cashAccounts/GetCashAccountOperations";
import { formatCurrency } from "helpers/formatCurrency";
import { formatDate } from "helpers/formatDate";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { columns } from "./columns";

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
		return <Text $fontWeight="700">{t("modal.RenameCashAccount.operations.empty")}</Text>;
	}

	if (!loading && cashAccountsOperationsExist) {
		const processedData =
			data?.cashAccount.operations.map(({ date, amount, uuid: dataUuid, type, ...rest }) => ({
				...rest,
				date: formatDate(date),
				amount: formatCurrency(amount, currency),
				identifier: dataUuid,
				type: t(`cashAccount.operation.type.${type}`),
			})) || [];

		return <Table columns={columns} data={processedData} />;
	}

	return null;
};
