import { gql } from "__generated__";
import { RemoveWalletMutation, RemoveWalletMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const REMOVE_WALLET = gql(/* GraphQL */ `
	mutation RemoveWallet($uuid: ID!) {
		removeWallet(uuid: $uuid) {
			success
		}
	}
`);

export const useMutationWalletCreate = (
	options?: MutationHookOptions<
		NoInfer<RemoveWalletMutation>,
		NoInfer<RemoveWalletMutationVariables>
	>,
) => useMutation<RemoveWalletMutation, RemoveWalletMutationVariables>(REMOVE_WALLET, options);
