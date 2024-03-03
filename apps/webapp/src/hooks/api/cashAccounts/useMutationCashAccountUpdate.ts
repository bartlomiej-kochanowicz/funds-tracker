import {
	CashAccountUpdateMutation,
	CashAccountUpdateMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { CASH_ACCOUNT_UPDATE } from "graphql/mutations/cashAccounts/CashAccountUpdate";

export const useMutationCashAccountUpdate = (
	options?: MutationHookOptions<
		NoInfer<CashAccountUpdateMutation>,
		NoInfer<CashAccountUpdateMutationVariables>
	>,
) =>
	useMutation<CashAccountUpdateMutation, CashAccountUpdateMutationVariables>(
		CASH_ACCOUNT_UPDATE,
		options,
	);
