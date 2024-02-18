import { gql } from "__generated__";

export const CASH_ACCOUNT_UPDATE = gql(/* GraphQL */ `
	mutation CashAccountUpdate($uuid: ID!, $data: CashAccountUpdateInput!) {
		cashAccountUpdate(uuid: $uuid, data: $data) {
			uuid
			name
		}
	}
`);
