import {
  CashAccountOperation,
  GetCashAccountOperationsQuery,
  GetCashAccountOperationsQueryVariables,
} from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Loader } from 'components/atoms';
import { Column, Table } from 'components/molecules';
import { GET_CASH_ACCOUNT_OPERATIONS } from 'graphql/query/GetCashAccountOperations';
import { FC } from 'react';

interface CashAccountOperationsProps {
  uuid: string;
}

export const CashAccountOperations: FC<CashAccountOperationsProps> = ({ uuid }) => {
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
    const columns = [
      { identifier: 'amount', accessor: 'amount', header: 'Amount' },
      { identifier: 'type', accessor: 'type', header: 'Type' },
      { identifier: 'date', accessor: 'date', header: 'Data' },
    ] satisfies Column<CashAccountOperation>[];

    return (
      <Table
        columns={columns}
        data={data?.cashAccount.operations || []}
      />
    );
  }

  return null;
};
