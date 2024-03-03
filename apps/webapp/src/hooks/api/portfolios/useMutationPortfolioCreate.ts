import { gql } from "__generated__";
import { PortfolioCreateMutation, PortfolioCreateMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const PORTFOLIO_CREATE = gql(/* GraphQL */ `
	mutation PortfolioCreate($data: PortfolioCreateInput!) {
		portfolioCreate(data: $data) {
			uuid
			name
		}
	}
`);

export const useMutationPortfolioCreate = (
	options?: MutationHookOptions<
		NoInfer<PortfolioCreateMutation>,
		NoInfer<PortfolioCreateMutationVariables>
	>,
) =>
	useMutation<PortfolioCreateMutation, PortfolioCreateMutationVariables>(PORTFOLIO_CREATE, options);
