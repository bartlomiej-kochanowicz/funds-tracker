import { gql } from "__generated__";
import { EmailExistQuery, EmailExistQueryVariables } from "__generated__/graphql";
import { LazyQueryHookOptions, NoInfer, useLazyQuery } from "@apollo/client";

export const EMAIL_EXIST = gql(/* GraphQL */ `
	query EmailExist($data: EmailInput!) {
		emailExist(data: $data) {
			exist
		}
	}
`);

export const useLazyQueryUserEmailExist = (
	options?: LazyQueryHookOptions<NoInfer<EmailExistQuery>, NoInfer<EmailExistQueryVariables>>,
) => useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EMAIL_EXIST, options);
