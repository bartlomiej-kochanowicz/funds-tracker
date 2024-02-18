import { gql } from "__generated__";

export const PORTFOLIO_CREATE = gql(/* GraphQL */ `
	mutation PortfolioCreate($data: PortfolioCreateInput!) {
		portfolioCreate(data: $data) {
			uuid
			name
		}
	}
`);
