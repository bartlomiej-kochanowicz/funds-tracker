import { gql } from "__generated__/gql";

export const GET_USER = gql(/* GraphQL */ `
	query GetUser {
		user {
			uuid
			name
			email
			createdAt
			introductionStep
			defaultCurrency
		}
	}
`);
