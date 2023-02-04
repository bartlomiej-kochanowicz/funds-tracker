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
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  mutation ConfirmSignup($data: ConfirmSignupInput!) {\n    confirmSignup(data: $data) {\n      success\n    }\n  }\n": types.ConfirmSignupDocument,
    "\n  mutation CreateCashAccount($data: CreateCashAccountInput!) {\n    createCashAccount(data: $data) {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n": types.CreateCashAccountDocument,
    "\n  mutation DeleteCashAccount($uuid: ID!) {\n    deleteCashAccount(uuid: $uuid) {\n      uuid\n      name\n      currency\n    }\n  }\n": types.DeleteCashAccountDocument,
    "\n  mutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n    introductionCreatePortfolios(data: $data) {\n      success\n    }\n  }\n": types.IntroductionCreatePortfoliosDocument,
    "\n  mutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n    introductionCreateCashAccounts(data: $data) {\n      success\n    }\n  }\n": types.IntroductionCreateCashAccountsDocument,
    "\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n": types.LogoutDocument,
    "\n  mutation RefreshToken {\n    refreshToken {\n      success\n    }\n  }\n": types.RefreshTokenDocument,
    "\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      success\n    }\n  }\n": types.ResetPasswordDocument,
    "\n  mutation SendCode($data: SendCodeInput!) {\n    sendCode(data: $data) {\n      success\n    }\n  }\n": types.SendCodeDocument,
    "\n  mutation SetNewPassword($data: SetNewPasswordInput!) {\n    setNewPassword(data: $data) {\n      success\n    }\n  }\n": types.SetNewPasswordDocument,
    "\n  mutation Signin($data: SigninInput!) {\n    signinLocal(data: $data) {\n      success\n    }\n  }\n": types.SigninDocument,
    "\n  mutation Signup($data: SignupInput!) {\n    signupLocal(data: $data) {\n      success\n    }\n  }\n": types.SignupDocument,
    "\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query EmailExist($data: EmailInput!) {\n    emailExist(data: $data) {\n      exist\n    }\n  }\n": types.EmailExistDocument,
    "\n  query GetCashAccounts {\n    cashAccounts {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n": types.GetCashAccountsDocument,
    "\n  query GetUser {\n    user {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n": types.GetUserDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ConfirmSignup($data: ConfirmSignupInput!) {\n    confirmSignup(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ConfirmSignup($data: ConfirmSignupInput!) {\n    confirmSignup(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCashAccount($data: CreateCashAccountInput!) {\n    createCashAccount(data: $data) {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCashAccount($data: CreateCashAccountInput!) {\n    createCashAccount(data: $data) {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteCashAccount($uuid: ID!) {\n    deleteCashAccount(uuid: $uuid) {\n      uuid\n      name\n      currency\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCashAccount($uuid: ID!) {\n    deleteCashAccount(uuid: $uuid) {\n      uuid\n      name\n      currency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n    introductionCreatePortfolios(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n    introductionCreatePortfolios(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n    introductionCreateCashAccounts(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n    introductionCreateCashAccounts(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RefreshToken {\n    refreshToken {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation RefreshToken {\n    refreshToken {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation ResetPassword($data: ResetPasswordInput!) {\n    resetPassword(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SendCode($data: SendCodeInput!) {\n    sendCode(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SendCode($data: SendCodeInput!) {\n    sendCode(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SetNewPassword($data: SetNewPasswordInput!) {\n    setNewPassword(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation SetNewPassword($data: SetNewPasswordInput!) {\n    setNewPassword(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signin($data: SigninInput!) {\n    signinLocal(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Signin($data: SigninInput!) {\n    signinLocal(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Signup($data: SignupInput!) {\n    signupLocal(data: $data) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation Signup($data: SignupInput!) {\n    signupLocal(data: $data) {\n      success\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query EmailExist($data: EmailInput!) {\n    emailExist(data: $data) {\n      exist\n    }\n  }\n"): (typeof documents)["\n  query EmailExist($data: EmailInput!) {\n    emailExist(data: $data) {\n      exist\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCashAccounts {\n    cashAccounts {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n"): (typeof documents)["\n  query GetCashAccounts {\n    cashAccounts {\n      uuid\n      name\n      currency\n      balance\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetUser {\n    user {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n"): (typeof documents)["\n  query GetUser {\n    user {\n      uuid\n      name\n      email\n      createdAt\n      introductionStep\n      defaultCurrency\n    }\n  }\n"];

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
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;