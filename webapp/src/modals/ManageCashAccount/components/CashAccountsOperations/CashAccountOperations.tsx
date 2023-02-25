import {
  Currency,
  GetCashAccountOperationsQuery,
  GetCashAccountOperationsQueryVariables,
} from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Loader } from 'components/atoms';
import { Table } from 'components/molecules';
import { GET_CASH_ACCOUNT_OPERATIONS } from 'graphql/query/GetCashAccountOperations';
import { formatCurrency } from 'helpers/formatCurrency';
import { formatDate } from 'helpers/formatDate';
import { FC } from 'react';

import { columns } from './columns';

interface CashAccountOperationsProps {
  uuid: string;
  currency: Currency;
}

export const CashAccountOperations: FC<CashAccountOperationsProps> = ({ uuid, currency }) => {
  const { loading, data } = useQuery<
    GetCashAccountOperationsQuery,
    GetCashAccountOperationsQueryVariables
  >(GET_CASH_ACCOUNT_OPERATIONS, { variables: { uuid } });

  const cashAccountsOperationsExist = Boolean(data && data.cashAccount.operations.length > 0);

  if (loading) {
    return <Loader />;
  }

  if (!loading && !cashAccountsOperationsExist) {
    return <div>There are no operations for this cash account.</div>;
  }

  if (!loading && cashAccountsOperationsExist) {
    const processedData =
      data?.cashAccount.operations.map(({ date, amount, uuid: dataUuid, ...rest }) => ({
        ...rest,
        date: formatDate(date),
        amount: formatCurrency(amount, currency),
        identifier: dataUuid,
      })) || [];

    return (
      <Table
        columns={columns}
        data={processedData}
      />
    );
  }

  return null;
};
