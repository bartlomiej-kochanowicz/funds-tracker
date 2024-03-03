import { SigninMutation, SigninMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { SIGNIN } from "graphql/mutations/authentication/Signin";

export const useMutationUserSignin = (
	options?: MutationHookOptions<NoInfer<SigninMutation>, NoInfer<SigninMutationVariables>>,
) => useMutation<SigninMutation, SigninMutationVariables>(SIGNIN, options);
