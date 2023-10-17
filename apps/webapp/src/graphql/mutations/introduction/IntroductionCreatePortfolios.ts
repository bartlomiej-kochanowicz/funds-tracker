import { gql } from "__generated__";

export const INTRODUCTION_CREATE_PORTFOLIOS = gql(/* GraphQL */ `
	mutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {
		introductionCreatePortfolios(data: $data) {
			success
		}
	}
`);
