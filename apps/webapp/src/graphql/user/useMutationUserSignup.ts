import { gql } from "__generated__";
import { SignupMutation, SignupMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const SIGNUP = gql(/* GraphQL */ `
	mutation Signup($data: SignupInput!) {
		signupLocal(data: $data) {
			success
		}
	}
`);

export const useMutationUserSignup = (
	options?: MutationHookOptions<NoInfer<SignupMutation>, NoInfer<SignupMutationVariables>>,
) => useMutation<SignupMutation, SignupMutationVariables>(SIGNUP, options);
