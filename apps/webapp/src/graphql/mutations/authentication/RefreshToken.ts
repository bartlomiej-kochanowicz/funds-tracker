import { gql } from "__generated__";

export const REFRESH_TOKEN = gql(/* GraphQL */ `
	mutation RefreshToken {
		refreshToken {
			success
		}
	}
`);
