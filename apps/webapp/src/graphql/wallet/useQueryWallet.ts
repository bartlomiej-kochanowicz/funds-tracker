import { gql } from "__generated__/gql";
import { GetWalletQuery, GetWalletQueryVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useQuery } from "@apollo/client";

export const GET_WALLET = gql(/* GraphQL */ `
	query GetWallet($uuid: ID!) {
		wallet(uuid: $uuid) {
			name
			uuid
		}
	}
`);

export const useQueryWallet = (
	options?: MutationHookOptions<NoInfer<GetWalletQuery>, NoInfer<GetWalletQueryVariables>>,
) => useQuery<GetWalletQuery, GetWalletQueryVariables>(GET_WALLET, options);
