import { gql } from "__generated__";

export const LOGOUT = gql(/* GraphQL */ `
	mutation Logout {
		logout {
			success
		}
	}
`);
