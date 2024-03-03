import { gql } from "__generated__";
import {
	CashAccountAddFundsMutation,
	CashAccountAddFundsMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const CASH_ACCOUNT_ADD_FUNDS = gql(/* GraphQL */ `
	mutation CashAccountAddFunds($data: CashAccountAddFundsInput!) {
		cashAccountAddFunds(data: $data) {
			balance
		}
	}
`);

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
