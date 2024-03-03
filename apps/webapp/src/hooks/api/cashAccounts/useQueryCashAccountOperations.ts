import {
	GetCashAccountOperationsQuery,
	GetCashAccountOperationsQueryVariables,
} from "__generated__/graphql";
import { NoInfer, QueryHookOptions, useQuery } from "@apollo/client";
import { GET_CASH_ACCOUNT_OPERATIONS } from "graphql/query/cashAccounts/GetCashAccountOperations";

export const useQueryCashAccountOperations = (
	options?: QueryHookOptions<
		NoInfer<GetCashAccountOperationsQuery>,
		NoInfer<GetCashAccountOperationsQueryVariables>
	>,
) =>
	useQuery<GetCashAccountOperationsQuery, GetCashAccountOperationsQueryVariables>(
		GET_CASH_ACCOUNT_OPERATIONS,
		options,
	);
