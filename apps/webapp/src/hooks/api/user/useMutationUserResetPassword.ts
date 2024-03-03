import { ResetPasswordMutation, ResetPasswordMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { RESET_PASSWORD } from "graphql/mutations/authentication/ResetPassword";

export const useMutationUserResetPassword = (
	options?: MutationHookOptions<
		NoInfer<ResetPasswordMutation>,
		NoInfer<ResetPasswordMutationVariables>
	>,
) => useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(RESET_PASSWORD, options);
