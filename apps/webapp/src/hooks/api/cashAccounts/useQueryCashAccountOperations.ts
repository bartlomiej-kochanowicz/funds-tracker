import { gql } from "__generated__";
import {
	GetCashAccountOperationsQuery,
	GetCashAccountOperationsQueryVariables,
} from "__generated__/graphql";
import { NoInfer, QueryHookOptions, useQuery } from "@apollo/client";

const GET_CASH_ACCOUNT_OPERATIONS = gql(/* GraphQL */ `
	query GetCashAccountOperations($uuid: ID!) {
		cashAccount(uuid: $uuid) {
			operations {
				uuid
				type
				amount
				date
			}
		}
	}
`);

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
