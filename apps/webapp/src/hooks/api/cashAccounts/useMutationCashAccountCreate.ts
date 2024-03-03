import { gql } from "__generated__";
import {
	CashAccountCreateMutation,
	CashAccountCreateMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const CASH_ACCOUNT_CREATE = gql(/* GraphQL */ `
	mutation CashAccountCreate($data: CashAccountCreateInput!) {
		cashAccountCreate(data: $data) {
			uuid
			name
			currency
			balance
		}
	}
`);

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
