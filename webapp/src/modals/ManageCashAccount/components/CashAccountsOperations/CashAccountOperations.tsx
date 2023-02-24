import { useQuery } from '@apollo/client';
import { Loader } from 'components/atoms';
import { GET_CASH_ACCOUNT_OPERATIONS } from 'graphql/query/GetCashAccountOperations';
import { FC } from 'react';
import {
  GetCashAccountOperationsQuery,
  GetCashAccountOperationsQueryVariables,
} from '__generated__/graphql';

interface CashAccountOperationsProps {
  uuid: string;
}

export const CashAccountOperations: FC<CashAccountOperationsProps> = ({ uuid }) => {
  const { loading } = useQuery<
    GetCashAccountOperationsQuery,
    GetCashAccountOperationsQueryVariables
  >(GET_CASH_ACCOUNT_OPERATIONS, { variables: { uuid } });

  if (loading) {
    return <Loader />;
  }

  return null;
};
