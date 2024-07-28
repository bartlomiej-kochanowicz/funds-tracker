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
    "\n\tmutation RefreshToken {\n\t\trefreshToken {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.RefreshTokenDocument,
    "\n\tmutation CashAccountAddFunds($data: CashAccountAddFundsInput!) {\n\t\tcashAccountAddFunds(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n": types.CashAccountAddFundsDocument,
    "\n\tmutation CashAccountCreate($data: CashAccountCreateInput!) {\n\t\tcashAccountCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n": types.CashAccountCreateDocument,
    "\n\tmutation CashAccountDelete($uuid: ID!) {\n\t\tcashAccountDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.CashAccountDeleteDocument,
    "\n\tmutation CashAccountUpdate($uuid: ID!, $data: CashAccountUpdateInput!) {\n\t\tcashAccountUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.CashAccountUpdateDocument,
    "\n\tquery GetCashAccountOperations($uuid: ID!) {\n\t\tcashAccount(uuid: $uuid) {\n\t\t\toperations {\n\t\t\t\tuuid\n\t\t\t\ttype\n\t\t\t\tamount\n\t\t\t\tdate\n\t\t\t}\n\t\t}\n\t}\n": types.GetCashAccountOperationsDocument,
    "\n\tquery GetCashAccounts {\n\t\tcashAccounts {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n": types.GetCashAccountsDocument,
    "\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n": types.GetInstrumentHistoryDocument,
    "\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tcurrency\n\t\t\tstockExchange\n\t\t\texchangeShortName\n\t\t}\n\t}\n": types.SearchInstrumentDocument,
    "\n\tmutation PortfolioCreate($data: PortfolioCreateInput!) {\n\t\tportfolioCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.PortfolioCreateDocument,
    "\n\tmutation PortfolioDelete($uuid: String!) {\n\t\tportfolioDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.PortfolioDeleteDocument,
    "\n\tmutation PortfolioUpdate($uuid: String!, $data: PortfolioUpdateInput!) {\n\t\tportfolioUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.PortfolioUpdateDocument,
    "\n\tquery GetPortfolioSummary($data: PortfolioSummaryInput!) {\n\t\tportfolioSummary(data: $data) {\n\t\t\tdata {\n\t\t\t\tdate\n\t\t\t\tmarketValues {\n\t\t\t\t\tsymbol\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\tcash\n\t\t\t}\n\t\t}\n\t}\n": types.GetPortfolioSummaryDocument,
    "\n\tquery GetPortfolio($uuid: String!) {\n\t\tportfolio(uuid: $uuid) {\n\t\t\tuuid\n\t\t\tname\n\t\t\ttransactions {\n\t\t\t\tuuid\n\t\t\t\tdate\n\t\t\t\tquantity\n\t\t\t\tprice\n\t\t\t\ttype\n\t\t\t\tinstrument {\n\t\t\t\t\tuuid\n\t\t\t\t\tsymbol\n\t\t\t\t\tname\n\t\t\t\t\ttype\n\t\t\t\t\tcurrency\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetPortfolioDocument,
    "\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n": types.GetPortfoliosDocument,
    "\n\tmutation TransactionCreate($data: TransactionCreateInput!) {\n\t\ttransactionCreate(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n": types.TransactionCreateDocument,
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
export function gql(source: "\n\tmutation CashAccountAddFunds($data: CashAccountAddFundsInput!) {\n\t\tcashAccountAddFunds(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CashAccountAddFunds($data: CashAccountAddFundsInput!) {\n\t\tcashAccountAddFunds(data: $data) {\n\t\t\tbalance\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CashAccountCreate($data: CashAccountCreateInput!) {\n\t\tcashAccountCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CashAccountCreate($data: CashAccountCreateInput!) {\n\t\tcashAccountCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t\tcurrency\n\t\t\tbalance\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CashAccountDelete($uuid: ID!) {\n\t\tcashAccountDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CashAccountDelete($uuid: ID!) {\n\t\tcashAccountDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation CashAccountUpdate($uuid: ID!, $data: CashAccountUpdateInput!) {\n\t\tcashAccountUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation CashAccountUpdate($uuid: ID!, $data: CashAccountUpdateInput!) {\n\t\tcashAccountUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
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
export function gql(source: "\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetInstrumentHistory($data: InstrumentHistoryInput!) {\n\t\tinstrumentHistory(data: $data) {\n\t\t\tdate\n\t\t\topen\n\t\t\tclose\n\t\t\thigh\n\t\t\tlow\n\t\t\tvolume\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tcurrency\n\t\t\tstockExchange\n\t\t\texchangeShortName\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery SearchInstrument($data: SearchInstrumentInput!) {\n\t\tsearchInstrument(data: $data) {\n\t\t\tsymbol\n\t\t\tname\n\t\t\tcurrency\n\t\t\tstockExchange\n\t\t\texchangeShortName\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation PortfolioCreate($data: PortfolioCreateInput!) {\n\t\tportfolioCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation PortfolioCreate($data: PortfolioCreateInput!) {\n\t\tportfolioCreate(data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation PortfolioDelete($uuid: String!) {\n\t\tportfolioDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation PortfolioDelete($uuid: String!) {\n\t\tportfolioDelete(uuid: $uuid) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation PortfolioUpdate($uuid: String!, $data: PortfolioUpdateInput!) {\n\t\tportfolioUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation PortfolioUpdate($uuid: String!, $data: PortfolioUpdateInput!) {\n\t\tportfolioUpdate(uuid: $uuid, data: $data) {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPortfolioSummary($data: PortfolioSummaryInput!) {\n\t\tportfolioSummary(data: $data) {\n\t\t\tdata {\n\t\t\t\tdate\n\t\t\t\tmarketValues {\n\t\t\t\t\tsymbol\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\tcash\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPortfolioSummary($data: PortfolioSummaryInput!) {\n\t\tportfolioSummary(data: $data) {\n\t\t\tdata {\n\t\t\t\tdate\n\t\t\t\tmarketValues {\n\t\t\t\t\tsymbol\n\t\t\t\t\tvalue\n\t\t\t\t}\n\t\t\t\tcash\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPortfolio($uuid: String!) {\n\t\tportfolio(uuid: $uuid) {\n\t\t\tuuid\n\t\t\tname\n\t\t\ttransactions {\n\t\t\t\tuuid\n\t\t\t\tdate\n\t\t\t\tquantity\n\t\t\t\tprice\n\t\t\t\ttype\n\t\t\t\tinstrument {\n\t\t\t\t\tuuid\n\t\t\t\t\tsymbol\n\t\t\t\t\tname\n\t\t\t\t\ttype\n\t\t\t\t\tcurrency\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPortfolio($uuid: String!) {\n\t\tportfolio(uuid: $uuid) {\n\t\t\tuuid\n\t\t\tname\n\t\t\ttransactions {\n\t\t\t\tuuid\n\t\t\t\tdate\n\t\t\t\tquantity\n\t\t\t\tprice\n\t\t\t\ttype\n\t\t\t\tinstrument {\n\t\t\t\t\tuuid\n\t\t\t\t\tsymbol\n\t\t\t\t\tname\n\t\t\t\t\ttype\n\t\t\t\t\tcurrency\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetPortfolios {\n\t\tportfolios {\n\t\t\tuuid\n\t\t\tname\n\t\t}\n\t}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tmutation TransactionCreate($data: TransactionCreateInput!) {\n\t\ttransactionCreate(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation TransactionCreate($data: TransactionCreateInput!) {\n\t\ttransactionCreate(data: $data) {\n\t\t\tsuccess\n\t\t}\n\t}\n"];
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