import {
	CashAccountDeleteMutation,
	CashAccountDeleteMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { CASH_ACCOUNT_DELETE } from "graphql/mutations/cashAccounts/CashAccountDelete";

export const useMutationCashAccountDelete = (
	options?: MutationHookOptions<
		NoInfer<CashAccountDeleteMutation>,
		NoInfer<CashAccountDeleteMutationVariables>
	>,
) =>
	useMutation<CashAccountDeleteMutation, CashAccountDeleteMutationVariables>(
		CASH_ACCOUNT_DELETE,
		options,
	);
