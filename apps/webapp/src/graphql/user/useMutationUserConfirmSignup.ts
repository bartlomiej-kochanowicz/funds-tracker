import { gql } from "__generated__";
import { ConfirmSignUpMutation, ConfirmSignUpMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

export const CONFIRM_SIGNUP = gql(/* GraphQL */ `
	mutation ConfirmSignUp($data: ConfirmSignUpInput!) {
		confirmSignUp(data: $data) {
			success
		}
	}
`);

export const useMutationUserConfirmSignup = (
	options?: MutationHookOptions<
		NoInfer<ConfirmSignUpMutation>,
		NoInfer<ConfirmSignUpMutationVariables>
	>,
) => useMutation<ConfirmSignUpMutation, ConfirmSignUpMutationVariables>(CONFIRM_SIGNUP, options);
