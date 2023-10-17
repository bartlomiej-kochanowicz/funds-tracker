import { gql } from "__generated__";

export const UPDATE_PORTFOLIO = gql(/* GraphQL */ `
	mutation UpdatePortfolio($uuid: String!, $data: UpdatePortfolioInput!) {
		updatePortfolio(uuid: $uuid, data: $data) {
			uuid
			name
		}
	}
`);
