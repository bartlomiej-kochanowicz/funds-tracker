import { gql } from "__generated__";
import { PortfolioUpdateMutation, PortfolioUpdateMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const PORTFOLIO_UPDATE = gql(/* GraphQL */ `
	mutation PortfolioUpdate($uuid: String!, $data: PortfolioUpdateInput!) {
		portfolioUpdate(uuid: $uuid, data: $data) {
			uuid
			name
		}
	}
`);

export const useMutationPortfolioUpdate = (
	options?: MutationHookOptions<
		NoInfer<PortfolioUpdateMutation>,
		NoInfer<PortfolioUpdateMutationVariables>
	>,
) =>
	useMutation<PortfolioUpdateMutation, PortfolioUpdateMutationVariables>(PORTFOLIO_UPDATE, options);
