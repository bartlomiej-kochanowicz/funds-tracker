import { gql } from "__generated__/gql";
import { GetUserQuery } from "__generated__/graphql";
import { useLazyQuery } from "@apollo/client";

export const GET_USER = gql(/* GraphQL */ `
	query GetUser {
		user {
			uuid
			name
			email
			createdAt
			subscription
		}
	}
`);

export const useLazyQueryUser = () => useLazyQuery<GetUserQuery>(GET_USER);
