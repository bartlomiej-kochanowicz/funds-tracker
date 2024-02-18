import { gql } from "__generated__";

export const CASH_ACCOUNT_DELETE = gql(/* GraphQL */ `
	mutation CashAccountDelete($uuid: ID!) {
		cashAccountDelete(uuid: $uuid) {
			success
		}
	}
`);
