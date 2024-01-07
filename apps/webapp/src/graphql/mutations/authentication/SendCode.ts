import { gql } from "__generated__";

export const SEND_CODE = gql(/* GraphQL */ `
	mutation SendCode($data: SendCodeInput!) {
		sendCode(data: $data) {
			success
		}
	}
`);
