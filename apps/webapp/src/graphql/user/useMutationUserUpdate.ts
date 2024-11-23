import { gql } from "__generated__";
import { UpdateUserMutation, UpdateUserMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const UPDATE_USER = gql(/* GraphQL */ `
	mutation UpdateUser($data: UpdateUserInput!) {
		updateUser(data: $data) {
			uuid
			name
			email
			createdAt
			introductionStep
			defaultCurrency
		}
	}
`);

export const useMutationUserUpdate = (
	options?: MutationHookOptions<NoInfer<UpdateUserMutation>, NoInfer<UpdateUserMutationVariables>>,
) => useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UPDATE_USER, options);
