import { gql } from "__generated__";

export const INTRODUCTION_CREATE_PORTFOLIOS = gql(/* GraphQL */ `
	mutation IntroductionPortfolioCreates($data: IntroductionPortfolioCreatesInput!) {
		introductionPortfolioCreates(data: $data) {
			success
		}
	}
`);
