import { PortfolioCreateMutation, PortfolioCreateMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { PORTFOLIO_CREATE } from "graphql/mutations/portfolios/PortfolioCreate";

export const useMutationPortfolioCreate = (
	options?: MutationHookOptions<
		NoInfer<PortfolioCreateMutation>,
		NoInfer<PortfolioCreateMutationVariables>
	>,
) =>
	useMutation<PortfolioCreateMutation, PortfolioCreateMutationVariables>(PORTFOLIO_CREATE, options);
