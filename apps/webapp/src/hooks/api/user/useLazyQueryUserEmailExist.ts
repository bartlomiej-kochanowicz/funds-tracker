import { EmailExistQuery, EmailExistQueryVariables } from "__generated__/graphql";
import { LazyQueryHookOptions, NoInfer, useLazyQuery } from "@apollo/client";
import { EMAIL_EXIST } from "graphql/query/common/EmailExist";

export const useLazyQueryUserEmailExist = (
	options?: LazyQueryHookOptions<NoInfer<EmailExistQuery>, NoInfer<EmailExistQueryVariables>>,
) => useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EMAIL_EXIST, options);
