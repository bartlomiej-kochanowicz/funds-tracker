import { gql } from "__generated__";
import {
	CashAccountUpdateMutation,
	CashAccountUpdateMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const CASH_ACCOUNT_UPDATE = gql(/* GraphQL */ `
	mutation CashAccountUpdate($uuid: ID!, $data: CashAccountUpdateInput!) {
		cashAccountUpdate(uuid: $uuid, data: $data) {
			uuid
			name
		}
	}
`);

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
