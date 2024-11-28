import { gql } from "__generated__";
import { SigninMutation, SigninMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

export const SIGNIN = gql(/* GraphQL */ `
	mutation Signin($data: SignInInput!) {
		signInLocal(data: $data) {
			success
		}
	}
`);

export const useMutationUserSignin = (
	options?: MutationHookOptions<NoInfer<SigninMutation>, NoInfer<SigninMutationVariables>>,
) => useMutation<SigninMutation, SigninMutationVariables>(SIGNIN, options);
