import { gql } from "__generated__";
import { SignupMutation, SignupMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const SIGNUP = gql(/* GraphQL */ `
	mutation Signup($data: SignUpInput!) {
		signUpLocal(data: $data) {
			success
		}
	}
`);

export const useMutationUserSignup = (
	options?: MutationHookOptions<NoInfer<SignupMutation>, NoInfer<SignupMutationVariables>>,
) => useMutation<SignupMutation, SignupMutationVariables>(SIGNUP, options);
