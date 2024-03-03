import { gql } from "__generated__";
import { GetPortfoliosQuery } from "__generated__/graphql";
import { useSuspenseQuery } from "@apollo/client";

export const GET_PORTFOLIOS = gql(/* GraphQL */ `
	query GetPortfolios {
		portfolios {
			uuid
			name
		}
	}
`);

export const useSuspenseQueryPortfolios = () =>
	useSuspenseQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);
