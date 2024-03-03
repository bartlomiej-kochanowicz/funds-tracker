import { gql } from "__generated__";
import { LogoutMutation } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

const LOGOUT = gql(/* GraphQL */ `
	mutation Logout {
		logout {
			success
		}
	}
`);

export const useMutationUserLogout = (options?: MutationHookOptions<NoInfer<LogoutMutation>>) =>
	useMutation<LogoutMutation>(LOGOUT, options);
