import { gql } from "__generated__";

export const SIGNUP = gql(/* GraphQL */ `
	mutation Signup($data: SignupInput!) {
		signupLocal(data: $data) {
			success
		}
	}
`);
