import { PortfolioDeleteMutation, PortfolioDeleteMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { PORTFOLIO_DELETE } from "graphql/mutations/portfolios/PortfolioDelete";

export const useMutationPortfolioDelete = (
	options?: MutationHookOptions<
		NoInfer<PortfolioDeleteMutation>,
		NoInfer<PortfolioDeleteMutationVariables>
	>,
) =>
	useMutation<PortfolioDeleteMutation, PortfolioDeleteMutationVariables>(PORTFOLIO_DELETE, options);
