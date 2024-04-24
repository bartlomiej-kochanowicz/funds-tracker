import { gql } from "__generated__";
import { GetPortfolioSummaryQuery, GetPortfolioSummaryQueryVariables } from "__generated__/graphql";
import { useQuery } from "@apollo/client";

export const GET_PORTFOLIO_SUMMARY = gql(/* GraphQL */ `
	query GetPortfolioSummary($data: PortfolioSummaryInput!) {
		portfolioSummary(data: $data) {
			data {
				date
				marketValue
				cumulativeCash
			}
		}
	}
`);

export const useQueryPortfolioSummary = ({
	uuid,
	from,
	to,
}: GetPortfolioSummaryQueryVariables["data"]) =>
	useQuery<GetPortfolioSummaryQuery, GetPortfolioSummaryQueryVariables>(GET_PORTFOLIO_SUMMARY, {
		variables: {
			data: {
				uuid,
				from,
				to,
			},
		},
	});
