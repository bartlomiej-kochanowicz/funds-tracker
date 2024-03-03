import { SignupMutation, SignupMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { SIGNUP } from "graphql/mutations/authentication/Signup";

export const useMutationUserSignup = (
	options?: MutationHookOptions<NoInfer<SignupMutation>, NoInfer<SignupMutationVariables>>,
) => useMutation<SignupMutation, SignupMutationVariables>(SIGNUP, options);
