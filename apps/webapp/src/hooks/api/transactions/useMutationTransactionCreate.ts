import { gql } from "__generated__";
import {
	TransactionCreateMutation,
	TransactionCreateMutationVariables,
} from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const TRANSACTION_CREATE = gql(/* GraphQL */ `
	mutation TransactionCreate($data: TransactionCreateInput!) {
		transactionCreate(data: $data) {
			success
		}
	}
`);

export const useMutationTransactionCreate = (
	options?: MutationHookOptions<
		NoInfer<TransactionCreateMutation>,
		NoInfer<TransactionCreateMutationVariables>
	>,
) =>
	useMutation<TransactionCreateMutation, TransactionCreateMutationVariables>(
		TRANSACTION_CREATE,
		options,
	);
