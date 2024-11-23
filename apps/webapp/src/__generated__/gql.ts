/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.RefreshTokenDocument,
    "\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n": types.EmailExistDocument,
    "\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.ConfirmSignupDocument,
    "\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.LogoutDocument,
    "\n\tmutation ResetPassword($data: ResetPasswordInput!) {\n\t\tresetPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.ResetPasswordDocument,
    "\n\tmutation SendCode($data: SendCodeInput!) {\n\t\tsendCode(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SendCodeDocument,
    "\n\tmutation SetNewPassword($data: SetNewPasswordInput!) {\n\t\tsetNewPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SetNewPasswordDocument,
    "\n\tmutation Signin($data: SigninInput!) {\n\t\tsigninLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SigninDocument,
    "\n\tmutation Signup($data: SignupInput!) {\n\t\tsignupLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SignupDocument,
    "\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n": types.UpdateUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation ResetPassword($data: ResetPasswordInput!) {\n\t\tresetPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ResetPassword($data: ResetPasswordInput!) {\n\t\tresetPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SendCode($data: SendCodeInput!) {\n\t\tsendCode(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SendCode($data: SendCodeInput!) {\n\t\tsendCode(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation SetNewPassword($data: SetNewPasswordInput!) {\n\t\tsetNewPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation SetNewPassword($data: SetNewPasswordInput!) {\n\t\tsetNewPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Signin($data: SigninInput!) {\n\t\tsigninLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Signin($data: SigninInput!) {\n\t\tsigninLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Signup($data: SignupInput!) {\n\t\tsignupLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Signup($data: SignupInput!) {\n\t\tsignupLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;