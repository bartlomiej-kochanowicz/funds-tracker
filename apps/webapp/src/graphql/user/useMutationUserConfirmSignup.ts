import { gql } from "__generated__";
import { ConfirmSignupMutation, ConfirmSignupMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

export const CONFIRM_SIGNUP = gql(/* GraphQL */ `
	mutation ConfirmSignup($data: ConfirmSignupInput!) {
		confirmSignup(data: $data) {
			success
		}
	}
`);

export const useMutationUserConfirmSignup = (
	options?: MutationHookOptions<
		NoInfer<ConfirmSignupMutation>,
		NoInfer<ConfirmSignupMutationVariables>
	>,
) => useMutation<ConfirmSignupMutation, ConfirmSignupMutationVariables>(CONFIRM_SIGNUP, options);
