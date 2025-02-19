import { gql } from "__generated__";
import { UpdateWalletMutation, UpdateWalletMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const UPDATE_WALLET = gql(/* GraphQL */ `
	mutation UpdateWallet($uuid: ID!, $data: UpdateWalletInput!) {
		updateWallet(uuid: $uuid, data: $data) {
			name
			uuid
		}
	}
`);

export const useMutationWalletUpdate = (
	options?: MutationHookOptions<
		NoInfer<UpdateWalletMutation>,
		NoInfer<UpdateWalletMutationVariables>
	>,
) => useMutation<UpdateWalletMutation, UpdateWalletMutationVariables>(UPDATE_WALLET, options);
