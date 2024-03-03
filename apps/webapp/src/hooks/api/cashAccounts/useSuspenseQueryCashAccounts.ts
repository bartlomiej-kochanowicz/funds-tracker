import { GetCashAccountsQuery } from "__generated__/graphql";
import { gql, TypedDocumentNode, useSuspenseQuery } from "@apollo/client";

const GET_CASH_ACCOUNTS: TypedDocumentNode<GetCashAccountsQuery> = gql(/* GraphQL */ `
	query GetCashAccounts {
		cashAccounts {
			uuid
			name
			currency
			balance
		}
	}
`);

export const useSuspenseQueryCashAccounts = () =>
	useSuspenseQuery<GetCashAccountsQuery>(GET_CASH_ACCOUNTS);
