import {
	CashAccountAddFundsMutation,
	CashAccountAddFundsMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { CASH_ACCOUNT_ADD_FUNDS } from "graphql/mutations/cashAccounts/CashAccountAddFunds";

export const useMutationCashAccountAddFunds = (
	options?: MutationHookOptions<
		NoInfer<CashAccountAddFundsMutation>,
		NoInfer<CashAccountAddFundsMutationVariables>
	>,
) =>
	useMutation<CashAccountAddFundsMutation, CashAccountAddFundsMutationVariables>(
		CASH_ACCOUNT_ADD_FUNDS,
		options,
	);
