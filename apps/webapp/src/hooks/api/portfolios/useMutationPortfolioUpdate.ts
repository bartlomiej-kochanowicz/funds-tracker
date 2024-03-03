import { PortfolioUpdateMutation, PortfolioUpdateMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { PORTFOLIO_UPDATE } from "graphql/mutations/portfolios/PortfolioUpdate";

export const useMutationPortfolioUpdate = (
	options?: MutationHookOptions<
		NoInfer<PortfolioUpdateMutation>,
		NoInfer<PortfolioUpdateMutationVariables>
	>,
) =>
	useMutation<PortfolioUpdateMutation, PortfolioUpdateMutationVariables>(PORTFOLIO_UPDATE, options);
