import { gql } from "__generated__";
import { SetNewPasswordMutation, SetNewPasswordMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const SET_NEW_PASSWORD = gql(/* GraphQL */ `
	mutation SetNewPassword($data: SetNewPasswordInput!) {
		setNewPassword(data: $data) {
			success
		}
	}
`);

export const useMutationUserSetNewPassword = (
	options?: MutationHookOptions<
		NoInfer<SetNewPasswordMutation>,
		NoInfer<SetNewPasswordMutationVariables>
	>,
) =>
	useMutation<SetNewPasswordMutation, SetNewPasswordMutationVariables>(SET_NEW_PASSWORD, options);
