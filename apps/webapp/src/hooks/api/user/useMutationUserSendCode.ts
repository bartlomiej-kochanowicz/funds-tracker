import { gql } from "__generated__";
import { SendCodeMutation, SendCodeMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";

export const SEND_CODE = gql(/* GraphQL */ `
	mutation SendCode($data: SendCodeInput!) {
		sendCode(data: $data) {
			success
		}
	}
`);

export const useMutationUserSendCode = (
	options?: MutationHookOptions<NoInfer<SendCodeMutation>, NoInfer<SendCodeMutationVariables>>,
) => useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, options);
