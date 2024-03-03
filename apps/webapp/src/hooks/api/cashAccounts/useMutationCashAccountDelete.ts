import { gql } from "__generated__";
import {
	CashAccountDeleteMutation,
	CashAccountDeleteMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const CASH_ACCOUNT_DELETE = gql(/* GraphQL */ `
	mutation CashAccountDelete($uuid: ID!) {
		cashAccountDelete(uuid: $uuid) {
			success
		}
	}
`);

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
