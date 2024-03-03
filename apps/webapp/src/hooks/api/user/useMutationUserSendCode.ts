import { SendCodeMutation, SendCodeMutationVariables } from "__generated__/graphql";
import { MutationHookOptions, NoInfer, useMutation } from "@apollo/client";
import { SEND_CODE } from "graphql/mutations/authentication/SendCode";

export const useMutationUserSendCode = (
	options?: MutationHookOptions<NoInfer<SendCodeMutation>, NoInfer<SendCodeMutationVariables>>,
) => useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, options);
