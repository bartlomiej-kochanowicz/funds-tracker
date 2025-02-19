import { gql } from "__generated__/gql";
import { GetWalletsQuery } from "__generated__/graphql";
import { useQuery } from "@apollo/client";

export const GET_WALLETS = gql(/* GraphQL */ `
	query GetWallets {
		wallets {
			name
			uuid
		}
	}
`);

export const useQueryWallets = () => useQuery<GetWalletsQuery>(GET_WALLETS);
