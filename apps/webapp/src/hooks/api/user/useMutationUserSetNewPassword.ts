import { SetNewPasswordMutation, SetNewPasswordMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { SET_NEW_PASSWORD } from "graphql/mutations/authentication/SetNewPassword";

export const useMutationUserSetNewPassword = (
	options?: MutationHookOptions<
		NoInfer<SetNewPasswordMutation>,
		NoInfer<SetNewPasswordMutationVariables>
	>,
) =>
	useMutation<SetNewPasswordMutation, SetNewPasswordMutationVariables>(SET_NEW_PASSWORD, options);
