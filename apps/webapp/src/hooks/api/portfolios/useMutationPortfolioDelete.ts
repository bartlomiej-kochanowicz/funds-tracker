import { gql } from "__generated__";
import { PortfolioDeleteMutation, PortfolioDeleteMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const PORTFOLIO_DELETE = gql(/* GraphQL */ `
	mutation PortfolioDelete($uuid: String!) {
		portfolioDelete(uuid: $uuid) {
			success
		}
	}
`);

export const useMutationPortfolioDelete = (
	options?: MutationHookOptions<
		NoInfer<PortfolioDeleteMutation>,
		NoInfer<PortfolioDeleteMutationVariables>
	>,
) =>
	useMutation<PortfolioDeleteMutation, PortfolioDeleteMutationVariables>(PORTFOLIO_DELETE, options);
