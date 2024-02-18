import { gql } from "__generated__";

export const INTRODUCTION_CREATE_CASH_ACCOUNTS = gql(/* GraphQL */ `
	mutation IntroductionCashAccountCreates($data: IntroductionCashAccountCreatesInput!) {
		introductionCashAccountCreates(data: $data) {
			success
		}
	}
`);
