import { useQuery } from '@apollo/client';
import { Loader } from 'components/atoms';
import { GET_CASH_ACCOUNT_OPERATIONS } from 'graphql/query/GetCashAccountOperations';
import { formatDate } from 'helpers/formatDate';
import { FC } from 'react';
import {
  GetCashAccountOperationsQuery,
  GetCashAccountOperationsQueryVariables,
} from '__generated__/graphql';

interface CashAccountOperationsProps {
  uuid: string;
}

export const CashAccountOperations: FC<CashAccountOperationsProps> = ({ uuid }) => {
  const { loading, data } = useQuery<
    GetCashAccountOperationsQuery,
    GetCashAccountOperationsQueryVariables
  >(GET_CASH_ACCOUNT_OPERATIONS, { variables: { uuid } });

  if (loading) {
    return <Loader />;
  }

  if (!loading && !data?.cashAccount.operations.length) {
    return <div>There are no operations for this cash account.</div>;
  }

  return (
    <div>
      {data?.cashAccount.operations.map(operation => {
        return (
          <div key={operation.uuid}>
            {operation.type} {operation.amount} {formatDate(operation.date)}
          </div>
        );
      })}
    </div>
  );
};
