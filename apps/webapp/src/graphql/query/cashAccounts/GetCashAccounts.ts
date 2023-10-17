import { gql } from "__generated__";

export const GET_CASH_ACCOUNTS = gql(/* GraphQL */ `
	query GetCashAccounts {
		cashAccounts {
			uuid
			name
			currency
			balance
		}
	}
`);