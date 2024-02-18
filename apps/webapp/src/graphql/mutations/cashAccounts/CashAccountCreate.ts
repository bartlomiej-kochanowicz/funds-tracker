import { gql } from "__generated__";

export const CASH_ACCOUNT_CREATE = gql(/* GraphQL */ `
	mutation CashAccountCreate($data: CashAccountCreateInput!) {
		cashAccountCreate(data: $data) {
			uuid
			name
			currency
			balance
		}
	}
`);
