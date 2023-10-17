import { gql } from "__generated__";

export const EMAIL_EXIST = gql(/* GraphQL */ `
	query EmailExist($data: EmailInput!) {
		emailExist(data: $data) {
			exist
		}
	}
`);
