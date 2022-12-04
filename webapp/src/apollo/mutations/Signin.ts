import { TypedDocumentNode } from '@apollo/client';
import { gql } from '__generated__/gql';
import { User, SigninInput } from '__generated__/graphql';

export const Signin = gql(`
mutation Signin($data: SigninInput!) {
	signinLocal(
		data: $data
	) {
		uuid
		name
	}
}
`) as TypedDocumentNode<User, SigninInput>;
