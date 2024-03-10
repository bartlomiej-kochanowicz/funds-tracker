import { gql } from "__generated__";
import { GetPortfolioQuery, GetPortfolioQueryVariables } from "__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client";

export const GET_PORTFOLIO = gql(/* GraphQL */ `
	query GetPortfolio($uuid: String!) {
		portfolio(uuid: $uuid) {
			uuid
			name
			transactions {
				uuid
				date
				quantity
				price
				type
				instrument {
					uuid
					codeExchange
					name
					type
				}
			}
		}
	}
`);

export const useSuspenseQueryPortfolio = (uuid: string) =>
	useSuspenseQuery<GetPortfolioQuery, GetPortfolioQueryVariables>(GET_PORTFOLIO, {
		variables: {
			uuid,
		},
	});
