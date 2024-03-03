import { LogoutMutation } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { LOGOUT } from "graphql/mutations/authentication/Logout";

export const useMutationUserLogout = (options?: MutationHookOptions<NoInfer<LogoutMutation>>) =>
	useMutation<LogoutMutation>(LOGOUT, options);
