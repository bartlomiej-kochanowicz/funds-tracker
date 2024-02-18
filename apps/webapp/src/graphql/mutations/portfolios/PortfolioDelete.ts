import { gql } from "__generated__";

export const PORTFOLIO_DELETE = gql(/* GraphQL */ `
	mutation PortfolioDelete($uuid: String!) {
		portfolioDelete(uuid: $uuid) {
			success
		}
	}
`);
