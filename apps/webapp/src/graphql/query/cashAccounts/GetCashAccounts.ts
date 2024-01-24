import { GetCashAccountsQuery } from "__generated__/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_CASH_ACCOUNTS: TypedDocumentNode<GetCashAccountsQuery> = gql(/* GraphQL */ `
	query GetCashAccounts {
		cashAccounts {
			uuid
			name
			currency
			balance
		}
	}
`);
