import { gql } from "__generated__";

export const CASH_ACCOUNT_ADD_FUNDS = gql(/* GraphQL */ `
	mutation CashAccountAddFunds($data: CashAccountAddFundsInput!) {
		cashAccountAddFunds(data: $data) {
			balance
		}
	}
`);
