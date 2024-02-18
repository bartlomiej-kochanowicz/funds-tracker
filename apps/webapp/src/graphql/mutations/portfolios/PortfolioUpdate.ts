import { gql } from "__generated__";

export const PORTFOLIO_UPDATE = gql(/* GraphQL */ `
	mutation PortfolioUpdate($uuid: String!, $data: PortfolioUpdateInput!) {
		portfolioUpdate(uuid: $uuid, data: $data) {
			uuid
			name
		}
	}
`);
