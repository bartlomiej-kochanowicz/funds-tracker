import { ConfirmSignupMutation, ConfirmSignupMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { CONFIRM_SIGNUP } from "graphql/mutations/authentication/ConfirmSignup";

export const useMutationUserConfirmSignup = (
	options?: MutationHookOptions<
		NoInfer<ConfirmSignupMutation>,
		NoInfer<ConfirmSignupMutationVariables>
	>,
) => useMutation<ConfirmSignupMutation, ConfirmSignupMutationVariables>(CONFIRM_SIGNUP, options);
