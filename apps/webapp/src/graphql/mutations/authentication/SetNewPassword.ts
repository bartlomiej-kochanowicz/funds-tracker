import { gql } from "__generated__";

export const SET_NEW_PASSWORD = gql(/* GraphQL */ `
	mutation SetNewPassword($data: SetNewPasswordInput!) {
		setNewPassword(data: $data) {
			success
		}
	}
`);
