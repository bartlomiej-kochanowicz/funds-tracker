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
 */
const documents = {
    "\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.ConfirmSignupDocument,
    "\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.LogoutDocument,
    "\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.RefreshTokenDocument,
    "\n\tmutation ResetPassword($data: ResetPasswordInput!) {\n\t\tresetPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.ResetPasswordDocument,
    "\n\tmutation SendCode($data: SendCodeInput!) {\n\t\tsendCode(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SendCodeDocument,
    "\n\tmutation SetNewPassword($data: SetNewPasswordInput!) {\n\t\tsetNewPassword(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SetNewPasswordDocument,
    "\n\tmutation Signin($data: SigninInput!) {\n\t\tsigninLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SigninDocument,
    "\n\tmutation Signup($data: SignupInput!) {\n\t\tsignupLocal(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.SignupDocument,
    "\n\tmutation AddFundsToCashAccount($data: AddFundsToCashAccountInput!) {\n\t\taddFundsToCashAccount(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n": types.AddFundsToCashAccountDocument,
    "\n\tmutation CreateCashAccount($data: CreateCashAccountInput!) {\n\t\tcreateCashAccount(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n": types.CreateCashAccountDocument,
    "\n\tmutation DeleteCashAccount($uuid: ID!) {\n\t\tdeleteCashAccount(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.DeleteCashAccountDocument,
    "\n\tmutation UpdateCashAccount($uuid: ID!, $data: UpdateCashAccountInput!) {\n\t\tupdateCashAccount(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.UpdateCashAccountDocument,
    "\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n": types.UpdateUserDocument,
    "\n\tmutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n\t\tintroductionCreateCashAccounts(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.IntroductionCreateCashAccountsDocument,
    "\n\tmutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n\t\tintroductionCreatePortfolios(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.IntroductionCreatePortfoliosDocument,
    "\n\tmutation CreatePortfolio($data: CreatePortfolioInput!) {\n\t\tcreatePortfolio(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.CreatePortfolioDocument,
    "\n\tmutation DeletePortfolio($uuid: String!) {\n\t\tdeletePortfolio(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.DeletePortfolioDocument,
    "\n\tmutation UpdatePortfolio($uuid: String!, $data: UpdatePortfolioInput!) {\n\t\tupdatePortfolio(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.UpdatePortfolioDocument,
    "\n\tquery GetCashAccountOperations($uuid: ID!) {\n\t\tcashAccount(uuid: $uuid) {\n\t\t\toperations {\n\t\t\t\tuuid\n\t\t\t\ttype\n\t\t\t\tamount\n\t\t\t\tdate\n\t\t\t}\n\t\t}\n\t}\n": types.GetCashAccountOperationsDocument,
    "\n\tquery GetCashAccounts {\n\t\tcashAccounts {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n": types.GetCashAccountsDocument,
    "\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n": types.EmailExistDocument,
    "\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n": types.GetUserDocument,
    "\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n": types.GetInstrumentHistoryDocument,
    "\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tCode\n\t\t\tExchange\n\t\t\tName\n\t\t\tType\n\t\t\tCountry\n\t\t\tCurrency\n\t\t\tISIN\n\t\t\tpreviousClose\n\t\t\tpreviousCloseDate\n\t\t}\n\t}\n": types.SearchInstrumentDocument,
    "\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.GetPortfoliosDocument,
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
export function gql(source: "\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation ConfirmSignup($data: ConfirmSignupInput!) {\n\t\tconfirmSignup(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation Logout {\n\t\tlogout {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
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
export function gql(source: "\n\tmutation AddFundsToCashAccount($data: AddFundsToCashAccountInput!) {\n\t\taddFundsToCashAccount(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddFundsToCashAccount($data: AddFundsToCashAccountInput!) {\n\t\taddFundsToCashAccount(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreateCashAccount($data: CreateCashAccountInput!) {\n\t\tcreateCashAccount(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreateCashAccount($data: CreateCashAccountInput!) {\n\t\tcreateCashAccount(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeleteCashAccount($uuid: ID!) {\n\t\tdeleteCashAccount(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteCashAccount($uuid: ID!) {\n\t\tdeleteCashAccount(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateCashAccount($uuid: ID!, $data: UpdateCashAccountInput!) {\n\t\tupdateCashAccount(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateCashAccount($uuid: ID!, $data: UpdateCashAccountInput!) {\n\t\tupdateCashAccount(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdateUser($data: UpdateUserInput!) {\n\t\tupdateUser(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n\t\tintroductionCreateCashAccounts(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation IntroductionCreateCashAccounts($data: IntroductionCreateCashAccountsInput!) {\n\t\tintroductionCreateCashAccounts(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n\t\tintroductionCreatePortfolios(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation IntroductionCreatePortfolios($data: IntroductionCreatePortfoliosInput!) {\n\t\tintroductionCreatePortfolios(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CreatePortfolio($data: CreatePortfolioInput!) {\n\t\tcreatePortfolio(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CreatePortfolio($data: CreatePortfolioInput!) {\n\t\tcreatePortfolio(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation DeletePortfolio($uuid: String!) {\n\t\tdeletePortfolio(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeletePortfolio($uuid: String!) {\n\t\tdeletePortfolio(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation UpdatePortfolio($uuid: String!, $data: UpdatePortfolioInput!) {\n\t\tupdatePortfolio(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation UpdatePortfolio($uuid: String!, $data: UpdatePortfolioInput!) {\n\t\tupdatePortfolio(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCashAccountOperations($uuid: ID!) {\n\t\tcashAccount(uuid: $uuid) {\n\t\t\toperations {\n\t\t\t\tuuid\n\t\t\t\ttype\n\t\t\t\tamount\n\t\t\t\tdate\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCashAccountOperations($uuid: ID!) {\n\t\tcashAccount(uuid: $uuid) {\n\t\t\toperations {\n\t\t\t\tuuid\n\t\t\t\ttype\n\t\t\t\tamount\n\t\t\t\tdate\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetCashAccounts {\n\t\tcashAccounts {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetCashAccounts {\n\t\tcashAccounts {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery EmailExist($data: EmailInput!) {\n\t\temailExist(data: $data) {\n\t\t\texist\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetUser {\n\t\tuser {\n\t\t\tuuid\n\t\t\tname\n\t\t\temail\n\t\t\tcreatedAt\n\t\t\tintroductionStep\n\t\t\tdefaultCurrency\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tCode\n\t\t\tExchange\n\t\t\tName\n\t\t\tType\n\t\t\tCountry\n\t\t\tCurrency\n\t\t\tISIN\n\t\t\tpreviousClose\n\t\t\tpreviousCloseDate\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tCode\n\t\t\tExchange\n\t\t\tName\n\t\t\tType\n\t\t\tCountry\n\t\t\tCurrency\n\t\t\tISIN\n\t\t\tpreviousClose\n\t\t\tpreviousCloseDate\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;