import {
	CashAccountCreateMutation,
	CashAccountCreateMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { CASH_ACCOUNT_CREATE } from "graphql/mutations/cashAccounts/CashAccountCreate";

export const useMutationCashAccountCreate = (
	options?: MutationHookOptions<
		NoInfer<CashAccountCreateMutation>,
		NoInfer<CashAccountCreateMutationVariables>
	>,
) =>
	useMutation<CashAccountCreateMutation, CashAccountCreateMutationVariables>(
		CASH_ACCOUNT_CREATE,
		options,
	);
