import { gql } from "__generated__";

export const CREATE_CASH_ACCOUNT = gql(/* GraphQL */ `
	mutation CreateCashAccount($data: CreateCashAccountInput!) {
		createCashAccount(data: $data) {
			uuid
			name
			currency
			balance
		}
	}
`);
