import { gql } from "__generated__";
import { ResetPasswordMutation, ResetPasswordMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const RESET_PASSWORD = gql(/* GraphQL */ `
	mutation ResetPassword($data: ResetPasswordInput!) {
		resetPassword(data: $data) {
			success
		}
	}
`);

export const useMutationUserResetPassword = (
	options?: MutationHookOptions<
		NoInfer<ResetPasswordMutation>,
		NoInfer<ResetPasswordMutationVariables>
	>,
) => useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD, options);
