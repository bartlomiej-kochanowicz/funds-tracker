import { gql } from "__generated__";
import { CreateWalletMutation, CreateWalletMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const CREATE_WALLET = gql(/* GraphQL */ `
	mutation CreateWallet($data: CreateWalletInput!) {
		createWallet(createWalletInput: $data) {
			uuid
			name
		}
	}
`);

export const useMutationWalletCreate = (
	options?: MutationHookOptions<
		NoInfer<CreateWalletMutation>,
		NoInfer<CreateWalletMutationVariables>
	>,
) => useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CREATE_WALLET, options);
